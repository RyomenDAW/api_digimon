import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;

  constructor() {
    // 🔹 CONECTAMOS A SUPABASE
    this.supabase = createClient(
      'https://izoeaqtlcbdhnctwrrax.supabase.co', // 🔹 CAMBIO ESTO POR TU URL
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6b2VhcXRsY2JkaG5jdHdycmF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNTU0NDUsImV4cCI6MjA1NTkzMTQ0NX0.yCjbx9t8J9BQy93DIRQWZOatt5lSVJGrXMTu1yljj_4' // 🔹 CAMBIO ESTO POR TU API KEY
    );
  }
  
  // ✅ REGISTRO DE USUARIO
  async register(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password
    });
    if (error) throw error;
    return data.user;
  }

  // ✅ INICIAR SESIÓN
  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data.user;
  }

  // ✅ CERRAR SESIÓN
  async logout() {
    await this.supabase.auth.signOut();
  }

  // ✅ OBTENER USUARIO ACTUAL
  async getCurrentUser() {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) return null;
    return data.user;
  }
}
