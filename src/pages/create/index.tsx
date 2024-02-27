import { Outlet } from 'react-router-dom';


export { CreateOne } from './CreateOne';
export { CreateTwo } from './CreateTwo';
export { CreateThree } from './CreateThree';
export { CreateComplete } from './CreateComplete';


export function CreateLayout() {
  return (
    <div>
      <p>This is the create page</p>
      <Outlet />
    </div>
  )
}