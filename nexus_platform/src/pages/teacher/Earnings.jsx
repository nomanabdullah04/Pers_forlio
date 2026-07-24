// src/pages/teacher/Earnings.jsx
import { useState } from 'react';
import { FiDollarSign, FiCreditCard, FiCheckCircle, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';
import styles from './Earnings.module.css';

const PAYOUTS = [
  { id: 'p1', date: '2026-07-01', amount: 24800, method: 'Bkash', status: 'paid' },
  { id: 'p2', date: '2026-06-01', amount: 19400, method: 'Bank Transfer', status: 'paid' },
  { id: 'p3', date: '2026-05-01', amount: 21000, method: 'Nagad', status: 'paid' },
];

export default function TeacherEarnings() {
  const [balance, setBalance] = useState(12800);
  const [payoutMethod, setPayoutMethod] = useState('Bkash');
  const [phone, setPhone] = useState('01711000000');

  const handleUpdateBilling = (e) => {
    e.preventDefault();
    toast.success('Billing details updated successfully!');
  };

  const handleRequestPayout = () => {
    if (balance <= 0) {
      toast.error('No balance available for payout');
      return;
    }
    toast.success(`Payout request of ৳${balance.toLocaleString()} submitted!`);
    setBalance(0);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1><FiDollarSign /> Earnings & Payouts</h1>
          <p className={styles.subtitle}>Track your educational monthly earnings, manage payouts, and update payment preferences.</p>
        </div>
      </div>

      <div className={styles.topRow}>
        <div className={styles.balanceCard}>
          <h3>Current Balance</h3>
          <div className={styles.balanceVal}>৳{balance.toLocaleString()}</div>
          <p style={{ color: '#8892b0', fontSize: '0.8rem', marginBottom: '1.25rem' }}>Next auto-payout: Aug 1, 2026</p>
          <button className={styles.payoutBtn} onClick={handleRequestPayout} disabled={balance === 0} id="request-payout-btn">
            Request Instant Payout
          </button>
        </div>

        <div className={styles.billingCard}>
          <h3>Payment Settings</h3>
          <form onSubmit={handleUpdateBilling} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Payout Method</label>
              <select value={payoutMethod} onChange={e => setPayoutMethod(e.target.value)} id="payout-method-select">
                <option value="Bkash">bKash (MFS)</option>
                <option value="Nagad">Nagad (MFS)</option>
                <option value="Bank Transfer">Bank Transfer (DBBL/BRAC)</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Account / Mobile Number</label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required id="payout-account-input" />
            </div>
            <button type="submit" className={styles.saveBtn} id="save-billing-btn">
              Update Billing Preferences
            </button>
          </form>
        </div>
      </div>

      <div className={styles.historySection}>
        <h2>Payout History</h2>
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {PAYOUTS.map(p => (
                <tr key={p.id}>
                  <td>{p.date}</td>
                  <td>৳{p.amount.toLocaleString()}</td>
                  <td>{p.method}</td>
                  <td>
                    <span className={styles.paidBadge}><FiCheckCircle /> PAID</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
