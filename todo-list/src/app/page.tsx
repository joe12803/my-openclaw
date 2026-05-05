import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, Circle, ListTodo } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // 初始化加载
  useEffect(() => {
    setIsMounted(true);
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // 持久化存储
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isMounted]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 overflow-hidden border border-slate-100">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2 text-white">
                <ListTodo className="w-8 h-8" />
                <h1 className="text-2xl font-bold tracking-tight">小爱的待办</h1>
              </div>
              <span className="bg-indigo-500 text-indigo-100 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {todos.filter(t => !t.completed).length} 个待办
              </span>
            </div>

            <form onSubmit={addTodo} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="添加新任务..."
                className="w-full bg-indigo-500/50 border border-indigo-400 text-white placeholder-indigo-200 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 aspect-square bg-white text-indigo-600 rounded-xl flex items-center justify-center hover:bg-indigo-50 active:scale-95 transition-all shadow-lg"
              >
                <Plus className="w-6 h-6" />
              </button>
            </form>
          </div>

          {/* List */}
          <div className="px-2 py-4">
            {todos.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ListTodo className="w-8 h-8 opacity-20" />
                </div>
                <p>今天还没有待办事项哦 ~</p>
              </div>
            ) : (
              <div className="space-y-1">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="group flex items-center space-x-4 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`flex-shrink-0 transition-colors ${
                        todo.completed ? 'text-emerald-500' : 'text-slate-300 group-hover:text-slate-400'
                      }`}
                    >
                      {todo.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>
                    <span
                      className={`flex-grow text-slate-700 transition-all ${
                        todo.completed ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <footer className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            由 小爱同学 为 Tom 打造 🌸
          </p>
        </footer>
      </div>
    </main>
  );
}
