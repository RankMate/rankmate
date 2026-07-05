import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (authMode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        alert('Check your email for the login link or confirm registration!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#000000] text-zinc-300 font-ui relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#ff4655] to-[#c8aa6e]"></div>
      
      <div className="w-full max-w-md p-8 bg-[#0a0a0a] border border-zinc-900 shadow-2xl relative z-10 animate-expandChat">
        <div className="flex items-center justify-center gap-3 mb-8">
          <i className="fa-solid fa-gamepad text-[32px] text-white"></i>
          <span className="font-gaming font-bold text-4xl text-white tracking-wide">RankMate</span>
        </div>
        
        <h2 className="font-gaming text-xl text-white mb-6 uppercase tracking-wider text-center border-b border-zinc-900 pb-4">
          {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleAuth} className="flex flex-col gap-5">
          <div>
            <label className="text-[10px] font-bold mb-1.5 block text-zinc-500 uppercase tracking-widest">Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full text-sm border rounded-sm p-3 outline-none transition-colors bg-[#050505] text-white border-zinc-800 focus:border-zinc-500" 
              placeholder="player@domain.com" 
            />
          </div>
          
          <div>
            <label className="text-[10px] font-bold mb-1.5 block text-zinc-500 uppercase tracking-widest">Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full text-sm border rounded-sm p-3 outline-none transition-colors bg-[#050505] text-white border-zinc-800 focus:border-zinc-500" 
              placeholder="••••••••" 
            />
          </div>
          
          <button type="submit" disabled={loading} className="w-full font-black font-gaming uppercase tracking-widest py-3 mt-2 transition-colors flex items-center justify-center gap-2 bg-zinc-100 text-black hover:bg-white rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.1)] disabled:opacity-50">
            {loading ? 'Processing...' : (authMode === 'login' ? 'Log In' : 'Join the Queue')} 
            {!loading && <i className="fa-solid fa-arrow-right"></i>}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <button 
            type="button"
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} 
            className="text-xs font-semibold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest"
          >
            {authMode === 'login' ? "Need an account? Sign up" : "Already registered? Log in"}
          </button>
        </div>
      </div>
    </div>
  )
}