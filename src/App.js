import './App.css';
import { usePagination, useCollection } from '@squidcloud/react'

const App = () => {
  const usersCollectionRef = useCollection('users', 'test')
  const { data: users, hasNext, hasPrev, next, prev } = usePagination(
    usersCollectionRef.query().sortBy('name').dereference(),
    // using { subscribe: true, pageSize: 5 } returns the following records:
    // [A] Luis
    // [B] Enrique
    // Alberto
    // Asuka
    // Diego
    // You can navigate to the next Page but then the previous page becomes unavailable. Making
    // imposible to see [A] Luis or [B] Enrique again

    // BUT using { subscribe: false, pageSize: 5 } changes the returned records to:
    // Alberto
    // Asuka
    // Diego
    // Enrique
    // Esteban
    // Here you can navigate throughtout all shown pagens but [A] Luis or [B] Enrique are never shown

    // NOW using { subscribe: false, pageSize: 10 }, returns the following records:
    // [A] Luis
    // [B] Enrique
    // Alberto
    // Asuka
    // Diego
    // Enrique
    // Esteban
    // Fatima
    // Galileo
    // Kirito
    // AND pagination stops working. Clicking Next page returns the exact same records
    // It feels like it requests the exact same page. Makin imposible to reach the last record
    // subscribe can be either true or false, issue is replicable using a number bigger than 5 in pageSize
    { subscribe: false, pageSize: 10 },
    []
  )

  return (
    <div className="App">
      <h1>Users</h1>
      { users.map((user) => <div key={user._id} >{user.name}</div>) }
      <div>
        <button onClick={prev} disabled={!hasPrev}>Previous page</button>
        <button onClick={next}  disabled={!hasNext}>Next page</button>
      </div>
    </div>
  );
}

export default App;
