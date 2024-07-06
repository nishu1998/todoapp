import { View, ScrollView } from 'react-native';
import Task from './Task/Task';
import styles from './styles';

export default function Tasks(props) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {props.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggleTaskStatus={() => props.onToggleTaskStatus(task.id)}
            onDeleteTask={() => props.onDeleteTask(task.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
