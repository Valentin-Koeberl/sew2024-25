<script setup>
import { ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators';

const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  birthday: '',
  phone: '',
  password: '',
  passwordRepeat: ''
});

const showConfirmation = ref(false);

const password = computed(() => form.value.password);

const formatPhoneNumber = (phone) => {
  phone = phone.replace(/[^\d+]/g, '');

  if (phone.length > 0 && phone[0] !== '+') {
    phone = '+' + phone;
  }

  if (phone.length > 3) {
    phone = phone.slice(0, 3) + ' ' + phone.slice(3);
  }
  if (phone.length > 7) {
    phone = phone.slice(0, 7) + ' ' + phone.slice(7);
  }

  return phone;
};

const phoneNumberValidator = helpers.withMessage(
    'Phone number must be in the format +11 111 1111111 and 14 characters long.',
    (value) => {
      value = value.replace(/\s/g, '');
      return value.length === 14 && value[0] === '+';
    }
);

const rules = {
  firstname: { required },
  lastname: { required },
  email: { required, email },
  birthday: { required },
  phone: {
    required,
    phoneNumberValidator
  },
  password: { required, minLength: minLength(3) },
  passwordRepeat: { required, sameAs: sameAs(password) }
};

const v$ = useVuelidate(rules, form);
const isFormValid = computed(() => !v$.value.$invalid);

const submitForm = () => {
  if (!v$.value.$invalid) {
    showConfirmation.value = true;
  }
};

const resetForm = () => {
  form.value = {
    firstname: '',
    lastname: '',
    email: '',
    birthday: '',
    phone: '',
    password: '',
    passwordRepeat: ''
  };
  v$.value.$reset();
  showConfirmation.value = false;
};
</script>

<template>
  <div class="container" v-if="!showConfirmation">
    <h2>Registration Form</h2>
    <form @submit.prevent="submitForm">
      <div :class="{ 'input-group': true, 'valid': v$.firstname.$dirty && !v$.firstname.$error, 'invalid': v$.firstname.$dirty && v$.firstname.$error }">
        <label>Firstname*</label>
        <input v-model="form.firstname" @blur="v$.firstname.$touch()" />
        <span v-if="v$.firstname.$error" class="error">Firstname is required</span>
      </div>
      <div :class="{ 'input-group': true, 'valid': v$.lastname.$dirty && !v$.lastname.$error, 'invalid': v$.lastname.$dirty && v$.lastname.$error }">
        <label>Lastname*</label>
        <input v-model="form.lastname" @blur="v$.lastname.$touch()" />
        <span v-if="v$.lastname.$error" class="error">Lastname is required</span>
      </div>
      <div :class="{ 'input-group': true, 'valid': v$.email.$dirty && !v$.email.$error, 'invalid': v$.email.$dirty && v$.email.$error }">
        <label>Email*</label>
        <input v-model="form.email" @blur="v$.email.$touch()" />
        <span v-if="v$.email.$error" class="error">Valid email is required</span>
      </div>
      <div :class="{ 'input-group': true, 'valid': v$.birthday.$dirty && !v$.birthday.$error, 'invalid': v$.birthday.$dirty && v$.birthday.$error }">
        <label>Birthday*</label>
        <input type="date" v-model="form.birthday" @blur="v$.birthday.$touch()" />
        <span v-if="v$.birthday.$error" class="error">Birthday is required</span>
      </div>
      <div :class="{ 'input-group': true, 'valid': v$.phone.$dirty && !v$.phone.$error, 'invalid': v$.phone.$dirty && v$.phone.$error }">
        <label>Phone</label>
        <input v-model="form.phone" @input="form.phone = formatPhoneNumber(form.phone)" @blur="v$.phone.$touch()" />
        <span v-if="v$.phone.$error" class="error">{{ v$.phone.phoneNumberValidator.$message }}</span>
      </div>
      <div :class="{ 'input-group': true, 'valid': v$.password.$dirty && !v$.password.$error, 'invalid': v$.password.$dirty && v$.password.$error }">
        <label>Password*</label>
        <input type="password" v-model="form.password" @blur="v$.password.$touch()" />
        <span v-if="v$.password.$error" class="error">Password must be at least 3 characters</span>
      </div>
      <div :class="{ 'input-group': true, 'valid': v$.passwordRepeat.$dirty && !v$.passwordRepeat.$error, 'invalid': v$.passwordRepeat.$dirty && v$.passwordRepeat.$error }">
        <label>Repeat Password*</label>
        <input type="password" v-model="form.passwordRepeat" @blur="v$.passwordRepeat.$touch()" />
        <span v-if="v$.passwordRepeat.$error" class="error">Passwords must match</span>
      </div>
      <button :disabled="!isFormValid">Submit</button>
    </form>
  </div>
  <div class="container" v-else>
    <h2>Form Submitted Successfully!</h2>
    <p>Your registration form has been submitted successfully.</p>
    <a href="#" @click.prevent="resetForm">Back to Registration Form</a>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}

.container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-weight: 700;
}

form {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

input:focus {
  outline: none;
}

.input-group.valid input {
  border-color: green;
}

.input-group.invalid input {
  border-color: red;
}

input:not(:focus):not(:invalid) {
  border-color: #007bff;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

button {
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #0056b3;
}

a {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.container.success {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

</style>
