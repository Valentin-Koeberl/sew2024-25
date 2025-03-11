<template>
  <div class="root">
    <h2>Create a User</h2>

    <p>
      <input type="text" placeholder="First Name (required)" v-model="state.information.firstname" @blur="v$.information.firstname.$touch()" />
      <span v-if="v$.information.firstname.$error" class="error">Enter your First Name</span>
    </p>

    <p>
      <input type="text" placeholder="Last Name (required)" v-model="state.information.lastname" @blur="v$.information.lastname.$touch()" />
      <span v-if="v$.information.lastname.$error" class="error">Enter your Last Name</span>
    </p>

    <p>
      <input type="date" placeholder="Enter your Birthday (required)" v-model="state.information.birthday" @blur="v$.information.birthday.$touch()" />
      <span v-if="v$.information.birthday.$error" class="error">Enter your Birthday</span>
    </p>

    <p>
      <input type="email" placeholder="Enter your E-Mail (required)" v-model="state.contacts.email" @blur="v$.contacts.email.$touch()" />
      <span v-if="v$.contacts.email.$error" class="error">
        {{ v$.contacts.email.$errors[0]?.$message }}
      </span>
    </p>

    <p>
      <input type="tel" placeholder="Enter your Phone number" v-model="state.contacts.phone" @blur="v$.contacts.phone.$touch()" />
      <span v-if="v$.contacts.phone.$error" class="error">Please enter your phone number</span>
    </p>

    <p>
      <input type="password" placeholder="Enter your password (required)" v-model="state.password.password" @blur="v$.password.password.$touch()" />
      <span v-if="v$.password.password.$error" class="error">Password is required and must be at least 3 characters long.</span>
    </p>

    <p>
      <input type="password" placeholder="Confirm your password (required)" v-model="state.password.passwordRepeat" @blur="v$.password.passwordRepeat.$touch()" />
      <span v-if="v$.password.passwordRepeat.$error" class="error">
        {{ v$.password.passwordRepeat.$errors[0]?.$message }}
      </span>
    </p>

    <button @click="submitForm" :disabled="!isFormValid" :class="{ 'disabled': !isFormValid }">Submit</button>

    <p v-if="formSubmitted" style="color: green;">Form successfully submitted!</p>
  </div>
</template>

<script>
import { reactive, computed, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, sameAs, minLength } from "@vuelidate/validators";

export default {
  setup() {
    const state = reactive({
      information: {
        firstname: "",
        lastname: "",
        birthday: "",
      },
      contacts: {
        email: "",
        phone: "",
      },
      password: {
        password: "",
        passwordRepeat: "",
      },
    });

    const rules = computed(() => ({
      information: {
        firstname: {required},
        lastname: {required},
        birthday: {required},
      },
      contacts: {
        email: {required, email},
        phone: {},
      },
      password: {
        password: {required, minLength: minLength(3)},
        passwordRepeat: {required, sameAs: sameAs(state.password.password)},
      },
    }));

    const v$ = useVuelidate(rules, state);
    const formSubmitted = ref(false);

    const isFormValid = computed(() => {
      return !v$.value.$invalid;
    });

    const submitForm = async () => {
      v$.value.$touch();
      const isValid = await v$.value.$validate();
      formSubmitted.value = isValid;
    };

    return {
      state,
      v$,
      submitForm,
      formSubmitted,
      isFormValid,
    };
  },
};
</script>

<style scoped>
.root {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

h2 {
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
}

p {
  margin-bottom: 1rem;
  position: relative;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

input:hover {
  border-color: #bbb;
}

.error {
  display: block;
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
  padding-left: 2px;
}

button {
  width: 100%;
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;
  margin-top: 10px;
}

button:hover:not(.disabled) {
  background-color: #3a7bc8;
}

button:active:not(.disabled) {
  background-color: #2c6cb2;
}

button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

input[type="date"] {
  color: #555;
}

input.error {
  border-color: #e74c3c;
}
</style>