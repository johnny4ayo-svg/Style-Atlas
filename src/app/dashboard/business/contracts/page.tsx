/* eslint-disable */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function BusinessContractsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .single();

  if (!business) {
    redirect('/dashboard/business');
  }

  // Fetch contracts
  const { data: contracts } = await supabase
    .from('escrow_contracts')
    .select('*, profiles!escrow_contracts_client_id_fkey(first_name, last_name, avatar_url), escrow_milestones(id, amount, status)')
    .eq('business_id', business.id)
    .order('created_at', { ascending: false });

  const Icon = ({ name }: { name: string }) => (
    <svg className="icon" aria-hidden="true">
      <use href={`/icons/sprite.svg#icon-${name}`}></use>
    </svg>
  );

  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Business workspace</span>
          <h1>Escrow Contracts</h1>
          <p className="text-gray-500 mt-2 max-w-xl">
            Manage bespoke orders, draft milestone payments, and track client deposits securely through STYLEATLAS Escrow.
          </p>
        </div>
        <div className="dashboard-actions">
          <Link className="btn btn-gold" href="/dashboard/business/contracts/new">
            Draft New Contract
          </Link>
        </div>
      </div>

      <div className="grid gap-6">
        {contracts && contracts.length > 0 ? (
          contracts.map((contract: any) => {
            const fundedAmount = contract.escrow_milestones?.filter((m: any) => m.status === 'funded' || m.status === 'released').reduce((acc: number, m: any) => acc + m.amount, 0) || 0;
            const progress = (fundedAmount / contract.total_amount) * 100;

            return (
              <div key={contract.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-bold rounded-md uppercase tracking-wider ${
                      contract.status === 'completed' ? 'bg-green-100 text-green-700' :
                      contract.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      contract.status === 'funded' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {contract.status.replace('_', ' ')}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-brand-black m-0">{contract.title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Icon name="user" /> {contract.profiles?.first_name} {contract.profiles?.last_name}
                    </div>
                    <div>•</div>
                    <div>
                      {contract.currency} {(contract.total_amount).toLocaleString()} Total
                    </div>
                  </div>

                  <div className="w-full max-w-md">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-gray-500">Funded</span>
                      <span className="text-brand-gold">{fundedAmount.toLocaleString()} / {contract.total_amount.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-gold" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-[140px]">
                  <Link href={`/dashboard/business/contracts/${contract.id}`} className="btn btn-outline-dark justify-center">
                    Manage Milestones
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-state bg-white">
            <Icon name="check" />
            <h3>No escrow contracts</h3>
            <p>Draft a milestone contract to offer clients secure, trusted bespoke services.</p>
            <Link className="btn btn-outline-dark mt-4" href="/dashboard/business/contracts/new">
              Draft First Contract
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
