<template>
    <div>
        <h2>登录</h2>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="email">邮箱</label>
                <input id="email" v-model="email" type="email" placeholder="输入您的邮箱" required />
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input id="password" v-model="password" type="password" placeholder="输入您的密码" required />
            </div>
            <button type="submit" class="btn btn-primary">登录</button>
            </form>
            <p class="text-center">
                没有账号？<RouterLink to="/auth/register">注册</RouterLink>
            </p>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleLogin = () => {
  console.log(email.value, password.value)
}


</script>

<style scoped>
h2 {
  color: rgb(255, 255, 255);
  font-size: 2em;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  margin-bottom: 1em;
  text-align: center;
}

.form-group {
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9em;
}

input {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1em;
  padding: 0.5em 1em;
  color: white;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

button {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 1em;
  padding: 0.5em 1em;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1em;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.02);
}
.text-center {
  margin-top: 1em;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9em;
  text-align: center;
}

.text-center a {
  color: rgb(255, 255, 255);
  text-decoration: none;
  padding: 0.25em 0.5em;
  border-radius: 1em;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
}

.text-center a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}
</style>