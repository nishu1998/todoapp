import { View, Text, Button } from 'react-native';
import styles from './styles';

export default function Task(props) {
  const { task, onToggleTaskStatus, onDeleteTask } = props;

  return (
    <View style={styles.container}>
      <Text>{task.description}</Text>
      <Text>Id: {task.id}</Text>
      <Text>Status: {task.done ? 'Completed' : 'Open'}</Text>
      <View style={styles.buttonsContainer}>
        <Button title={task.done ? "Undo" : "Done"} onPress={onToggleTaskStatus} />
        <Button title="Delete" onPress={onDeleteTask} />
      </View>
    </View>
  );
}
