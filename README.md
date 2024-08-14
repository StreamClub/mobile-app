# Para ejecutar:

```
npm install
npx expo
```
Para ejecutar sin expo go:
```
npx expo start --dev-client
```
Si llegan a tener problema de conectividad:
```
npx expo install @expo/ngrok@^4.1.0
npx expo start --dev-client --tunnel
```
Para hacer un rebuild:
```
eas build --profile development --platform android
```
Para instalar dependencias usar mejor:
```
npx expo install <dependencia>
```
