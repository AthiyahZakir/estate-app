import { useDrag } from 'react-dnd';
import PropertyCard from './PropertyCard';

function DraggablePropertyCard({ property }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROPERTY',
    item: { property },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div 
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    ><div className=""></div>
      <PropertyCard property={property} />
    </div>
  );
}

export default DraggablePropertyCard;