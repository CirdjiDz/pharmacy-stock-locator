import { Routes, Route } from 'react-router-dom'
import PharmacyStockLocator from './PharmacyStockLocator'
import AideVente from './pages/AideVente'
import Encyclopedie from './pages/Encyclopedie'
import DecisionTree from './pages/DecisionTree'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PharmacyStockLocator />} />
      <Route path="/aide-vente" element={<AideVente />} />
      <Route path="/encyclopedie" element={<Encyclopedie />} />
      <Route path="/decision" element={<DecisionTree />} />
    </Routes>
  )
}