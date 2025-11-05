"use client";
import { useAuthContext } from "@/app/provider";
import { useMutation } from "convex/react";
import { Button } from "@/components/ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { CircleDollarSign } from "lucide-react";
import { api } from "@/convex/_generated/api";

export const creditsPlans = [
  {
    credits: 10,
    cost: 1
  },
  {
    credits: 50,
    cost: 5
  },
  {
    credits: 100,
    cost: 9
  },
  {
    credits: 200,
    cost: 15
  },
  {
    credits: 300,
    cost: 20
  },
  {
    credits: 500,
    cost: 30
  },
];

function Billing() {
  const { user, setUser } = useAuthContext();
  const UpdateUserCredits = useMutation(api.users.UpdateUserCredits)

  const onPaymentSuccess = async (cost, credits) => {
    const result = await UpdateUserCredits({
      uid: user?._id,
      credits: Number(user?.credits) + Number(credits)
    })
    console.log(result)
    setUser(prev => ({
      ...prev,
      credits: Number(user?.credits) + Number(credits)
    }))
    alert('Credits Added')
  }

  return (
    <div>
      <h2 class="font-bold text-3xl">Credits</h2>
      <div class="p-4 border  rounded-xl flex justify-between  mt-7 max-w-2xl">
        <div>
          <h2 class=" font-bold text-xl">Total Credits Left</h2>
          <h2 class="text-sm">1 Credits = 1 Video</h2>
        </div>
        <h2 class="font-bold text-3xl ">{user?.credits} Credits</h2>
      </div>

      <p class="text-sm p-5 text-gray-500 max-w-2xl">When your credit balance reaches $0, your Video generation will stop working. Add Credits balance topped up.</p>
      <div className="mt-5">
        <h2 class="font-bold text-2xl">Buy More Credits</h2>
        <div>
          {creditsPlans.map((plan, idx) => (
            <div key={idx} className="p-5 mt-3 border rounded-xl max-w-2xl flex justify-between items-center">
              <h2 className=" text-xl flex gap-2 items-center"><CircleDollarSign /> {plan.credits} Credits</h2>
              <div className="flex gap-2 items-center">
                <h2 class="font-medium text-xl">{plan.cost} $</h2>
                <PayPalButtons style={{ layout: "horizontal" }}
                  onApprove={() => onPaymentSuccess(plan?.cost, plan?.credits)}
                  onCancel={() => alert('Payment canceled')}
                  createOrder={(data, action) => {
                    return action?.order?.create({
                      purchase_units: [
                        {
                          amount: {
                            value: plan.cost,
                            currency_code: 'USD'
                          }

                        }
                      ]
                    }
                    )
                  }}
                />
                {/* <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors 
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none 
                  [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">Buy now</Button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Billing;