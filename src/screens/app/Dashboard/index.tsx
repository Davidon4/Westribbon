import React, { useEffect, useState } from 'react';
import { Text, ImageBackground, FlatList, View, StyleSheet } from 'react-native';
import { graphqlNoAuthRequest } from '@/src/utils/client';
import { AppCard } from '@/src/components';
import { COLORS } from '../../../theme';

interface Training {
    id: string;
    title: string;
    slug: string;
    price: number;
    bg: string;
    is_active: boolean;
  }

const Dashboard = () => {
    const [trainings, setTrainings] = useState<Training[]>([]);;

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const graphql_string = `query AllTrainings {
        allTrainings {
          id
          title
          slug
          price
          bg
          is_active
        }
      }`;

      const response = await graphqlNoAuthRequest(graphql_string);
      if (response.error) {
        console.error('Error fetching trainings:', response.error);
      } else {
        setTrainings(response.data.allTrainings);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderTrainingCard = ({ item }: { item: Training }) => (
    <AppCard
      title={item.title}
    />
  );

  return (
    <ImageBackground style={styles.background} source={require("../../../../assets/background.png")} resizeMode='cover'>
      <View style={styles.container}>
        <FlatList
        numColumns={3}
          data={trainings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTrainingCard}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </ImageBackground>
  );
};

export default React.memo(Dashboard);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


