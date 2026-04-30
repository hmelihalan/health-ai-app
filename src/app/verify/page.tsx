import { Suspense } from "react";
import VerifyClient from "./VerifyClient";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading verification...</div>}>
      <VerifyClient />
    </Suspense>
  );
}
