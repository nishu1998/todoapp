import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Header from './src/components/header/Header';
import Tasks from './src/components/Tasks/Tasks';
import Form from './src/components/Form/Form';
import styles from './src/styles/main';
import { useState, useEffect } from 'react';
import { db } from './src/firebase';
import firebase from 'firebase/app';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksSnapshot = await db.collection('tasks').get();
        const tasksList = tasksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(tasksList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Error fetching tasks. Please try again later.');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (taskDescription, taskDone) => {
    try {
      const newTask = {
        description: taskDescription,
        done: taskDone,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await db.collection('tasks').add(newTask);
      setTasks([...tasks, { id: docRef.id, ...newTask }]);
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Error adding task. Please try again.');
    }
  };

  const handleToggleTaskStatus = async (taskId) => {
    try {
      const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          task.done = !task.done;
          db.collection('tasks').doc(taskId).update({ done: task.done });
        }
        return task;
      });

      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error toggling task status:', error);
      setError('Error toggling task status. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await db.collection('tasks').doc(taskId).delete();
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Error deleting task. Please try again.');
    }
  };

  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  if (error) {
    return <View><Text>{error}</Text></View>;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header />
      <Tasks tasks={tasks} onToggleTaskStatus={handleToggleTaskStatus} onDeleteTask={handleDeleteTask} />
      <Form onAddTask={handleAddTask} />
    </View>
  );
}
