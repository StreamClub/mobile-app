export type ButtonParams = {
  buttonText: string;
  size: 'small' | 'medium' | 'big';
  onPress: (...params: any[]) => void;
  disabled?: boolean;
  style?: object;
  icon?: string; 
}