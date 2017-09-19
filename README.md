# react-native-roots

# Usage
```js
// add root view
Roots.add('loading', (
  <View style={styles.container}>
    <View style={styles.mask}>
      <ActivityIndicator
        animating
        size="small"
        color="#fff"
      />
    </View>
  </View>
));

// remove root view
Roots.remove('loading');
```


```
<View>
  <App />         <---- original app
  <YourView1 />   <---- your view
  <YourView2 />   <---- your view
  <YourView3 />   <---- your view
  ...
</View>
```

# API
## add(key, element)

## remove(key)
