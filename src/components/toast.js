import Toast from 'react-native-root-toast';

export default function showToast(message, type) {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
}
