import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPlay, faPause, faCheck, faTrash, faClock } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

interface TodoItem {
  id: string;
  text: string;
  estimatedSeconds: number | null;
  status: 'pending' | 'running' | 'paused' | 'completed';
  elapsedSeconds: number;
  completedAt: Date | null;
  startedAt: Date | null;
}

function formatTime(seconds: number, showSeconds: boolean = true): string {
  const absSeconds = Math.abs(seconds);
  const hours = Math.floor(absSeconds / 3600);
  const minutes = Math.floor((absSeconds % 3600) / 60);
  const secs = absSeconds % 60;
  
  const prefix = seconds < 0 ? '-' : '';
  
  if (hours > 0) {
    return `${prefix}${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  if (showSeconds) {
    return `${prefix}${minutes}:${String(secs).padStart(2, '0')}`;
  }
  return `${prefix}${minutes}m`;
}

function formatTimeDiff(seconds: number): string {
  const absSeconds = Math.abs(seconds);
  const hours = Math.floor(absSeconds / 3600);
  const minutes = Math.floor((absSeconds % 3600) / 60);
  const secs = absSeconds % 60;
  
  const sign = seconds >= 0 ? '+' : '-';
  
  if (hours > 0) {
    return `${sign}${hours}h ${minutes}m ${secs}s`;
  }
  if (minutes > 0) {
    return `${sign}${minutes}m ${secs}s`;
  }
  return `${sign}${secs}s`;
}

function formatEstimated(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}小时`);
  if (minutes > 0) parts.push(`${minutes}分钟`);
  if (secs > 0) parts.push(`${secs}秒`);
  
  return parts.join(' ') || '0秒';
}

export default function TodoList(): React.JSX.Element {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('todoList');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((item: TodoItem) => ({
          ...item,
          completedAt: item.completedAt ? new Date(item.completedAt) : null,
          startedAt: item.startedAt ? new Date(item.startedAt) : null,
        }));
      }
    }
    return [];
  });
  
  const [newTodo, setNewTodo] = useState('');
  const [estimatedMinutes, setEstimatedMinutes] = useState<string>('');
  const [estimatedSeconds, setEstimatedSeconds] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [shiftingIds, setShiftingIds] = useState<Set<string>>(new Set());
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const listRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const runningTodos = todos.filter(t => t.status === 'running');
    
    if (runningTodos.length > 0) {
      intervalRef.current = setInterval(() => {
        setTodos(prev => prev.map(todo => {
          if (todo.status === 'running') {
            return { ...todo, elapsedSeconds: todo.elapsedSeconds + 1 };
          }
          return todo;
        }));
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [todos.some(t => t.status === 'running')]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const mins = estimatedMinutes ? parseInt(estimatedMinutes) * 60 : 0;
    const secs = estimatedSeconds ? parseInt(estimatedSeconds) : 0;
    const totalSeconds = mins + secs;
    
    const todo: TodoItem = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      estimatedSeconds: totalSeconds > 0 ? totalSeconds : null,
      status: 'pending',
      elapsedSeconds: 0,
      completedAt: null,
      startedAt: null,
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
    setEstimatedMinutes('');
    setEstimatedSeconds('');
    setShowForm(false);
  };

  const startTodo = useCallback((id: string) => {
    const listItem = listRefs.current.get(id);
    const list = listRef.current;
    
    if (listItem && list) {
      const itemRect = listItem.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();
      const offsetY = itemRect.top - listRect.top;
      
      const todoIndex = todos.findIndex(t => t.id === id);
      const itemsAbove = todos.slice(0, todoIndex).filter(t => t.status !== 'completed' && t.status !== 'running');
      const idsAbove = new Set(itemsAbove.map(t => t.id));
      
      setShiftingIds(idsAbove);
      setAnimatingId(id);
      
      listItem.style.transform = `translateY(${-offsetY}px)`;
      listItem.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      listItem.style.zIndex = '10';
      listItem.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.2)';
      
      idsAbove.forEach(aboveId => {
        const aboveItem = listRefs.current.get(aboveId);
        if (aboveItem) {
          aboveItem.style.transform = `translateY(${itemRect.height + 12}px)`;
          aboveItem.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
      });
      
      setTimeout(() => {
        setTodos(prev => {
          const todo = prev.find(t => t.id === id);
          if (!todo) return prev;
          
          const newTodos = prev.filter(t => t.id !== id);
          const updatedTodo = { ...todo, status: 'running' as const, startedAt: new Date() };
          return [updatedTodo, ...newTodos];
        });
        setAnimatingId(null);
        setShiftingIds(new Set());
      }, 400);
    } else {
      setTodos(prev => {
        const todo = prev.find(t => t.id === id);
        if (!todo) return prev;
        
        const newTodos = prev.filter(t => t.id !== id);
        const updatedTodo = { ...todo, status: 'running' as const, startedAt: new Date() };
        return [updatedTodo, ...newTodos];
      });
    }
  }, [todos]);

  const pauseTodo = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id && todo.status === 'running') {
        return { ...todo, status: 'paused' };
      }
      return todo;
    }));
  };

  const completeTodo = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id && (todo.status === 'running' || todo.status === 'paused')) {
        return { ...todo, status: 'completed', completedAt: new Date() };
      }
      return todo;
    }));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getRemainingTime = (): number => {
    return todos
      .filter(t => t.status !== 'completed' && t.estimatedSeconds !== null)
      .reduce((acc, t) => {
        const remaining = (t.estimatedSeconds as number) - t.elapsedSeconds;
        return acc + Math.max(0, remaining);
      }, 0);
  };

  const getTimerColor = (todo: TodoItem): string => {
    if (todo.status === 'completed') return 'var(--color-green)';
    if (!todo.estimatedSeconds) return 'var(--color-blue)';
    
    if (todo.elapsedSeconds > todo.estimatedSeconds) return 'var(--color-red)';
    return 'var(--color-blue)';
  };

  const getDisplayTime = (todo: TodoItem): number => {
    if (!todo.estimatedSeconds) return todo.elapsedSeconds;
    return todo.estimatedSeconds - todo.elapsedSeconds;
  };

  const getProgress = (todo: TodoItem): number => {
    if (!todo.estimatedSeconds) return 0;
    return Math.min(100, (todo.elapsedSeconds / todo.estimatedSeconds) * 100);
  };

  const pendingTodos = todos.filter(t => t.status !== 'completed');
  const completedTodos = todos.filter(t => t.status === 'completed');

  const renderTodoItem = (todo: TodoItem, isRunning: boolean = false) => {
    const diff = todo.estimatedSeconds 
      ? todo.elapsedSeconds - todo.estimatedSeconds
      : null;

    const progress = getProgress(todo);

    return (
      <div 
        key={todo.id}
        ref={(el) => {
          if (el && !isRunning) {
            listRefs.current.set(todo.id, el);
          }
        }}
        className={`${styles.todoItem} ${todo.status === 'completed' ? styles.todoItemCompleted : ''} ${isRunning ? styles.runningCard : ''} ${shiftingIds.has(todo.id) ? styles.shiftingItem : ''}`}
      >
        {isRunning && todo.estimatedSeconds && (
          <svg className={styles.progressBorder} viewBox="0 0 100 60" preserveAspectRatio="none">
            <rect
              className={styles.progressRect}
              x="1" y="1" width="98" height="58"
              rx="7" ry="7"
              fill="none"
              stroke="var(--color-blue)"
              strokeWidth="2"
              strokeDasharray={`${progress * 3.16} 360`}
              strokeDashoffset="0"
              style={{ transition: 'stroke-dasharray 1s linear' }}
            />
          </svg>
        )}
        <div className={styles.todoItemContent}>
          <span className={styles.todoItemText}>{todo.text}</span>
          {todo.status !== 'completed' && todo.estimatedSeconds && (
            <span className={styles.todoEstimated}>预估: {formatEstimated(todo.estimatedSeconds)}</span>
          )}
          {todo.status === 'completed' && (
            <div className={styles.todoCompletedInfo}>
              <span>完成时间: {formatTime(todo.elapsedSeconds)}</span>
              {diff !== null && (
                <span className={diff > 0 ? 'text-red' : 'text-green'}>
                  ({formatTimeDiff(diff)})
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className={styles.todoTimer} style={{ color: getTimerColor(todo) }}>
          {formatTime(Math.abs(getDisplayTime(todo)))}
          {todo.estimatedSeconds && getDisplayTime(todo) < 0 && ' ⚠️'}
        </div>

        <div className={styles.todoActions}>
          {todo.status === 'pending' && (
            <button className={`${styles.todoActionBtn} ${styles.todoActionBtnStart}`} onClick={() => startTodo(todo.id)} title="开始">
              <FontAwesomeIcon icon={faPlay} />
            </button>
          )}
          {todo.status === 'running' && (
            <>
              <button className={`${styles.todoActionBtn} ${styles.todoActionBtnPause}`} onClick={() => pauseTodo(todo.id)} title="暂停">
                <FontAwesomeIcon icon={faPause} />
              </button>
              <button className={`${styles.todoActionBtn} ${styles.todoActionBtnComplete}`} onClick={() => completeTodo(todo.id)} title="完成">
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </>
          )}
          {todo.status === 'paused' && (
            <>
              <button className={`${styles.todoActionBtn} ${styles.todoActionBtnStart}`} onClick={() => startTodo(todo.id)} title="继续">
                <FontAwesomeIcon icon={faPlay} />
              </button>
              <button className={`${styles.todoActionBtn} ${styles.todoActionBtnComplete}`} onClick={() => completeTodo(todo.id)} title="完成">
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </>
          )}
          <button className={`${styles.todoActionBtn} ${styles.todoActionBtnDelete}`} onClick={() => deleteTodo(todo.id)} title="删除">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    );
  };

  const runningTodo = pendingTodos.find(t => t.status === 'running');
  const otherPendingTodos = pendingTodos.filter(t => t.status !== 'running');

  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoHeader}>
        <h3>
          <FontAwesomeIcon icon={faClock} className="text-purple" style={{marginRight: '8px'}} />
          Todo List
        </h3>
        
        {!showForm && (
          <button 
            className={styles.todoAddBtn}
            onClick={() => setShowForm(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        )}
      </div>

      {showForm && (
        <div className={styles.todoForm}>
          <input
            type="text"
            placeholder="输入任务..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            className={styles.todoInput}
          />
          <div className={styles.todoTimeInputs}>
            <input
              type="number"
              placeholder="分钟"
              value={estimatedMinutes}
              onChange={(e) => setEstimatedMinutes(e.target.value)}
              className={`${styles.todoInput} ${styles.todoInputTime}`}
              min="0"
            />
            <input
              type="number"
              placeholder="秒"
              value={estimatedSeconds}
              onChange={(e) => setEstimatedSeconds(e.target.value)}
              className={`${styles.todoInput} ${styles.todoInputTime}`}
              min="0"
              max="59"
            />
          </div>
          <div className={styles.todoFormBtns}>
            <button className="button button--green button--sm" onClick={addTodo}>
              添加
            </button>
            <button className="button button--outline-blue button--sm" onClick={() => {setShowForm(false); setNewTodo(''); setEstimatedMinutes(''); setEstimatedSeconds('');}}>
              取消
            </button>
          </div>
        </div>
      )}

      <div className={styles.todoList} ref={listRef}>
        {runningTodo && renderTodoItem(runningTodo, true)}
        {otherPendingTodos.map(todo => renderTodoItem(todo))}
        {completedTodos.map(todo => renderTodoItem(todo))}

        {todos.length === 0 && (
          <div className={styles.todoEmpty}>暂无任务，点击 + 添加</div>
        )}
      </div>

      {pendingTodos.length > 0 && (
        <div className={styles.todoFooter}>
          <span>预估剩余时间:</span>
          <span className={styles.todoRemainingTime}>{formatTime(getRemainingTime())}</span>
        </div>
      )}
    </div>
  );
}
