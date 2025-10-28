// Simplified structure from
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { getMyEntities } from '@/services/entityService'; // Use your entity service
import { Entity } from '@/types';
import LoadingSpinner from '@/components/layout/LoadingSpinner'; //

const DashboardPage = () => {
  const { user } = useAuth();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getMyEntities(); // Fetch user's entities
        setEntities(data);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // Runs once on mount

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <h2>Your Entities:</h2>
      {entities.length > 0 ? (
        <ul>
          {entities.map(entity => (
            <li key={entity._id}>{entity.title}</li> // Display entity data
          ))}
        </ul>
      ) : (
        <p>You haven't created any entities yet.</p>
      )}
      {/* Add buttons/links for CRUD operations */}
    </div>
  );
};

export default DashboardPage;