import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { Select } from "@/components/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/date-picker";
import { convertAmountToMiliunits } from "@/lib/utils";
import { AmountInput } from "@/components/amount-input";
import { insertTransactionSchema } from "@/database/schema";
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.string(),
    notes: z.string().nullable().optional(),
})

const apiSchema = insertTransactionSchema.omit({
    id: true,
})

type FormValues = z.input<typeof formSchema>
type ApiFormValues = z.input<typeof apiSchema>

type Props = {
    id?: string
    defaultValues?: FormValues
    onSubmit: (values: ApiFormValues) => void
    onDelete: () => void
    disable?: boolean
    accountOptions: { label: string; value: string; }[]
    categoryOptions: { label: string; value: string; }[]
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void;
}

export const TransactionForm = (
    {
        id,
        defaultValues,
        onSubmit,
        onDelete,
        disable,
        accountOptions,
        categoryOptions,
        onCreateAccount,
        onCreateCategory,
    }: Props
) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    })

    const handleSubmit = (values: FormValues) => {
        const amount = parseFloat(values.amount)
        const amountInMiliunits = convertAmountToMiliunits(amount)


        onSubmit({
            ...values,
            amount: amountInMiliunits,
        })

        // console.log({ values })
    }

    const handleDelete = () => {
        onDelete?.()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 pt-4">
                <FormField name="date" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <DatePicker
                                value={field.value}
                                onChange={field.onChange}
                                disabled={disable}
                            />
                        </FormControl>
                    </FormItem>
                )} />
                <FormField name="accountId" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Account
                        </FormLabel>
                        <FormControl>
                            <Select
                                placeholder="Select an account"
                                options={accountOptions}
                                onCreate={onCreateAccount}
                                value={field.value}
                                onChange={field.onChange}
                                disabled={disable}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField name="categoryId" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Category
                        </FormLabel>
                        <FormControl>
                            <Select
                                placeholder="Select a category"
                                options={categoryOptions}
                                onCreate={onCreateCategory}
                                value={field.value}
                                onChange={field.onChange}
                                disabled={disable}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField name="payee" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Payee
                        </FormLabel>
                        <FormControl>
                            <Input
                                disabled={disable}
                                placeholder="Add a payee"
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField name="amount" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Amount
                        </FormLabel>
                        <FormControl>
                            <AmountInput
                                {...field}
                                disabled={disable}
                                placeholder="0.00"
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField name="notes" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Notes
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                {...field}
                                value={field.value ?? ""}
                                disabled={disable}
                                placeholder="Optional notes"
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <Button className="w-full" disabled={disable}>
                    {id ? "Save changes" : "Create Transaction"}
                </Button>
                {!!id && (<Button
                    type="button"
                    disabled={disable}
                    onClick={handleDelete}
                    className="w-full"

                >
                    <Trash className="size-4 mr-2" />
                    Delete Transaction
                </Button>)}
            </form>
        </Form>
    )
}