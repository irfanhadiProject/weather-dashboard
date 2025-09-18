import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import { toggleUnit } from '../store/slices/tempUnitSlice';

function TempToggle() {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.tempUnit.unit);
  return (
    <Button onClick={() => dispatch(toggleUnit())} variant="ghost" size="sm">
      {unit === 'C' ? 'Switch to ºF' : 'Switch to ºC'}
    </Button>
  );
}

export default TempToggle;
