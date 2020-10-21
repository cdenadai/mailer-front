<template>
  <div class="w-100 login-dark mb-5">
    <b-container>
      <form method="post">
        <h2 class="sr-only">Login Form</h2>
        <div class="d-flex flex-column illustration" 
              style="padding-top: 10px;padding-bottom: 10px;margin-bottom: 40px;"
        >
          <img src="imgs/logoGVM.png">
          <p 
            class="text-monospace" 
            style="font-size: 18px;color: #6f7a85;margin: opx;margin-bottom: 0px;"
          >
            <strong>Mailer</strong>
          </p>

        </div>
        
        <div class="form-group">
          <input class="form-control" type="email" v-model="user.email" placeholder="Email">
        </div>
        
        <div class="form-group">
          <input class="form-control" type="password" v-model="user.password" placeholder="Password">
        </div>
        
        <div class="form-group">
          <button 
            class="btn btn-primary btn-block" 
            type="button"
            @click="onSubmit" 
            style="background-color: #2980ef;"
          >Log In</button>
        </div>
        
      </form>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        user: {
          email: '',
          password: ''
        }
      };
    },
    methods: {
      ...mapActions('auth', ['login']),
      onSubmit() {
        this.login(this.user)
      }
    }
  };
</script>

<style lang="scss" scoped>

.login-dark {
background-size: cover;
  position: relative;
}

.login-dark form {
  max-width: 320px;
  width: 90%;
  background-color: #1e2833;
  padding: 40px;
  border-radius: 4px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  box-shadow: 3px 3px 4px rgba(0,0,0,0.2);
}

.login-dark .illustration {
  text-align: center;
  padding: 15px 0 20px;
  font-size: 100px;
  color: #2980ef;
}

.login-dark form .form-control {
  background: none;
  border: none;
  border-bottom: 1px solid #434a52;
  border-radius: 0;
  box-shadow: none;
  outline: none;
  color: inherit;
}

.login-dark form .btn-primary {
  background: #214a80;
  border: none;
  border-radius: 4px;
  padding: 11px;
  box-shadow: none;
  margin-top: 26px;
  text-shadow: none;
  outline: none;
}

.login-dark form .btn-primary:hover, .login-dark form .btn-primary:active {
  background: #214a80;
  outline: none;
}

.login-dark form .forgot {
  display: block;
  text-align: center;
  font-size: 12px;
  color: #6f7a85;
  opacity: 0.9;
  text-decoration: none;
}

.login-dark form .forgot:hover, .login-dark form .forgot:active {
  opacity: 1;
  text-decoration: none;
}

.login-dark form .btn-primary:active {
  transform: translateY(1px);
}


</style>