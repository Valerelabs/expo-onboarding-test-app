import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProfileIconProps {
  color: string;
  size: number;
}

export const ProfileIcon: React.FC<ProfileIconProps> = ({ color, size }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.head, { 
        borderColor: color,
        width: size * 0.35,
        height: size * 0.35,
        borderRadius: size * 0.175,
        borderWidth: size * 0.08,
      }]} />
      <View style={[styles.body, { 
        borderColor: color,
        width: size * 0.7,
        height: size * 0.7,
        borderRadius: size * 0.35,
        borderWidth: size * 0.08,
        top: size * 0.15,
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  },
  head: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
  },
  body: {
    backgroundColor: 'transparent',
    position: 'absolute',
  },
});

