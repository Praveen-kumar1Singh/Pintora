import { StaticPageLayout } from '@/components/layout/StaticPageLayout';

export const metadata = { title: 'Size Guide | Printora' };

export default function SizeGuidePage() {
  return (
    <StaticPageLayout title="Size Guide">
      <p>Finding the perfect fit is essential. Below you'll find the exact measurements for our core silhouettes. All measurements are in inches.</p>

      <h2>Oversized T-Shirts (Drop Shoulder)</h2>
      <div className="not-prose overflow-x-auto my-8 border rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Size</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Chest</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Length</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Sleeve</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr><td className="p-4 font-medium">S</td><td className="p-4 text-muted-foreground">42"</td><td className="p-4 text-muted-foreground">28"</td><td className="p-4 text-muted-foreground">9"</td></tr>
            <tr><td className="p-4 font-medium">M</td><td className="p-4 text-muted-foreground">44"</td><td className="p-4 text-muted-foreground">29"</td><td className="p-4 text-muted-foreground">9.5"</td></tr>
            <tr><td className="p-4 font-medium">L</td><td className="p-4 text-muted-foreground">46"</td><td className="p-4 text-muted-foreground">30"</td><td className="p-4 text-muted-foreground">10"</td></tr>
            <tr><td className="p-4 font-medium">XL</td><td className="p-4 text-muted-foreground">48"</td><td className="p-4 text-muted-foreground">31"</td><td className="p-4 text-muted-foreground">10.5"</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-muted-foreground mt-2"><strong>Fit Note:</strong> Designed to fit very loose. Stick to your normal size for the intended baggy look, or size down for a more standard fit.</p>

      <h2>Standard Hoodies</h2>
      <div className="not-prose overflow-x-auto my-8 border rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Size</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Chest</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Length</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Sleeve</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr><td className="p-4 font-medium">S</td><td className="p-4 text-muted-foreground">40"</td><td className="p-4 text-muted-foreground">27"</td><td className="p-4 text-muted-foreground">25"</td></tr>
            <tr><td className="p-4 font-medium">M</td><td className="p-4 text-muted-foreground">42"</td><td className="p-4 text-muted-foreground">28"</td><td className="p-4 text-muted-foreground">25.5"</td></tr>
            <tr><td className="p-4 font-medium">L</td><td className="p-4 text-muted-foreground">44"</td><td className="p-4 text-muted-foreground">29"</td><td className="p-4 text-muted-foreground">26"</td></tr>
            <tr><td className="p-4 font-medium">XL</td><td className="p-4 text-muted-foreground">46"</td><td className="p-4 text-muted-foreground">30"</td><td className="p-4 text-muted-foreground">26.5"</td></tr>
          </tbody>
        </table>
      </div>

      <h2>How to measure</h2>
      <ul>
        <li><strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</li>
        <li><strong>Length:</strong> Measure from the highest point of the shoulder down to the hem.</li>
        <li><strong>Sleeve:</strong> Measure from the shoulder seam down to the end of the sleeve.</li>
      </ul>
    </StaticPageLayout>
  );
}
