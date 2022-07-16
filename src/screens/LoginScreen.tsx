import React, { memo, useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import { Navigation } from '../types';

type Props = {
  navigation: Navigation;
};

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  //penk
  // const [postId, setPostId] = useState({ value: '', error: '' });
  // const [postPassword, setPostPassword] = useState({ value: '', error: '' });
  const [postId, setPostId] = useState();
  const [postPassword, setPostPassword] = useState();

  const [status, setStatus] = useState();
  // const [username, setUsername] = useState();
  // const [password, setPassword] = useState();

  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  // const getLoginData = async () => {
  //   try {
  //     const response = await fetch(
  //       'https://herokussru.herokuapp.com/api/login'
  //     );
  //     const json = await response.json();
  //     setData(json.movies);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getLoginData();
  // }, []);
  const _onLoginPressed2 = async () => {
    let res: any = [];
    try {
      await fetch('https://herokussru.herokuapp.com/api/login', {
        //https://www.mecallapi.com/api/login  //
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: postId,
          password: postPassword,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('ddddddd', data);
          res = data;
        })
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message
          );
          // ADD THIS THROW error
          throw error;
        });
    } catch (error) {
      console.log('e', error);
    }
    console.log('---->res', res);
    console.log('----->res.status', res.status);
    if (res.status === 'ok') {
      navigation.navigate('Dashboard');
    }
    // navigation.navigate('Dashboard');
  };

  // useEffect(() => {
  //   // POST request using fetch inside useEffect React hook
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ title: 'React Hooks POST Request Example' }),
  //   };
  //   fetch('https://herokussru.herokuapp.com/api/login', requestOptions)
  //     .then(response => response.json())
  //     .then(data => setPostId(data.id));

  //   // empty dependency array means this effect will only run once (like componentDidMount in classes)
  // }, []);

  // const _onLoginPressed = () => {
  //   const emailError = emailValidator(email.value);
  //   const passwordError = passwordValidator(password.value);

  //   if (emailError || passwordError) {
  //     setEmail({ ...email, error: emailError });
  //     setPassword({ ...password, error: passwordError });
  //     return;
  //   }

  //   navigation.navigate('Dashboard');
  // };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>Welcome back.dds</Header>

      <TextInput
        label="ID"
        returnKeyType="next"
        // value={email.value}
        // onChangeText={text => setEmail({ value: text, error: '' })}
        value={postId}
        onChangeText={text => setPostId(text)}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        // value={password.value}
        // onChangeText={text => setPassword({ value: text, error: '' })}
        value={postPassword}
        onChangeText={text => setPostPassword(text)}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed2}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* testAPI */}
      {/* <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>
                {item.title}, {item.releaseYear}
              </Text>
            )}
          />
        )}
      </View> */}
      {/* <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      /> */}

      {/* <Text>POST Request with React Hooks</Text>
      <TextInput
        label="IDTest"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      /> */}
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
