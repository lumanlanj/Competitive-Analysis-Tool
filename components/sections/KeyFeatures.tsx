import { KeyFeature } from '@/types/analysis';

interface KeyFeaturesProps {
  features: KeyFeature[];
}

export default function KeyFeatures({ features }: KeyFeaturesProps) {
  return (
    <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-xl ring-1 ring-slate-900/5">
      <h2 className="mb-6 text-2xl font-semibold text-slate-900">Key Features & Value-Add</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-3 text-left text-sm font-semibold text-slate-900">Feature</th>
              <th className="pb-3 text-left text-sm font-semibold text-slate-900">What It Does</th>
              <th className="pb-3 text-left text-sm font-semibold text-slate-900">Access Point</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {features.map((feature, index) => (
              <tr key={index} className="transition-colors hover:bg-slate-50/50">
                <td className="py-4 pr-4">
                  <span className="font-medium text-slate-900">{feature.feature}</span>
                </td>
                <td className="py-4 pr-4 text-slate-600">{feature.whatItDoes}</td>
                <td className="py-4 text-slate-600">{feature.accessPoint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
