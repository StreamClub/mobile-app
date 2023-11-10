export type ButtonParams = {
  buttonText: string;
  size: 'small' | 'medium' | 'big';
  onPress: () => void;
}