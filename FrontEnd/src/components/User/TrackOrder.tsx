import { FormEvent, useState } from "react";
import API from "../../Utils/API";

const TrackOrder = () => {

    const [OrderId, setOrderId] = useState("");
    const [SearchedOrder, setSearchedOrder] = useState<any>(null);
    const [Searching, setSearching] = useState(false);
    const [SearchMessage, setSearchMessage] = useState("");



    const SearchOrder = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const SearchId = OrderId.trim()
        setSearchedOrder(null);
        setSearchMessage("");

        if (!SearchId) {
            setSearchMessage("Enter an order ID to track your order.");
            return;
        }

        try {
            setSearching(true);
            const res = await API.get(`/order/${encodeURIComponent(SearchId)}`);
            if (res.data) {
                setSearchedOrder(res.data.FoundedOrder);
            }
        } catch (error: any) {
            setSearchMessage(error.response?.data?.message || "Could not find that order.");
        } finally {
            setSearching(false);

        }
    }

    const Status = SearchedOrder ? String(SearchedOrder.OrderStatus).toLowerCase() : "";

    return (
        <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-1 py-6 sm:gap-8 sm:px-0 sm:py-8">

            <header className="flex flex-col gap-2">
                <h1 className="font-accent text-3xl font-bold text-black sm:text-4xl">Track your order</h1>
                <p className="text-sm text-gray-600">Enter your order ID to see its latest status.</p>
            </header>

            <form onSubmit={SearchOrder} className="flex w-full flex-col gap-3 sm:flex-row">
                <input
                    value={OrderId}
                    onChange={(event) => setOrderId(event.target.value)}
                    aria-label="Order ID"
                    placeholder="Enter order ID"
                    className="min-w-0 flex-1 rounded-full border border-gray-300 bg-white px-5 py-3 text-black outline-none focus:border-black"
                />
                <button disabled={Searching} type="submit" className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60">
                    {Searching ? "Searching..." : "Track order"}
                </button>
            </form>

            {SearchMessage && (
                <p role="status" className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">
                    {SearchMessage}
                </p>
            )}


            {SearchedOrder && (
                <section className="flex min-w-0 flex-col gap-5 rounded-lg border border-gray-200 bg-white p-4 sm:gap-6 sm:p-7" aria-live="polite">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-4">
                        <div className="min-w-0 flex-1">
                            <p className="text-xs uppercase tracking-wide text-gray-500">Order ID</p>
                            <p className="break-all text-sm font-medium text-black sm:text-base">{SearchedOrder._id}</p>
                        </div>
                        <p className="text-right text-xs text-gray-600 sm:text-sm">
                            Placed {SearchedOrder.createdAt ? new Date(SearchedOrder.createdAt).toLocaleDateString() : "recently"}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h2 className="text-lg font-semibold text-black">Items in this order</h2>
                        {SearchedOrder.OrderItems?.length ? (
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {SearchedOrder.OrderItems.map((item: any, index: number) => {
                                    const ProductImage = item.ProductId?.Images?.[0];
                                    const ProductName = item.Name || item.ProductId?.Name || "Product";
                                    const ItemPrice = item.PriceAtPurchase ?? item.ProductId?.Price;

                                    return (
                                        <article key={item._id || `${ProductName}-${index}`} className="flex min-w-0 items-center gap-3 rounded-lg border border-gray-200 p-3">
                                            {ProductImage ? (
                                                <img
                                                    src={ProductImage}
                                                    alt={ProductName}
                                                    className="size-16 shrink-0 rounded-md object-cover sm:size-20"
                                                />
                                            ) : (
                                                <div className="flex size-16 shrink-0 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-500 sm:size-20">
                                                    No image
                                                </div>
                                            )}
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-medium text-black">{ProductName}</p>
                                                <p className="mt-1 text-sm text-gray-600">Qty: {item.Quantity ?? 1}</p>
                                                {ItemPrice != null && (
                                                    <p className="text-sm text-gray-600">Rs. {Math.round(ItemPrice)}</p>
                                                )}
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-600">No product details are available for this order.</p>
                        )}
                    </div>

                    {Status === "processing" && (
                        <div className="border-l-4 border-amber-500 py-1 pl-4">
                            <h2 className="font-semibold text-black">Processing</h2>
                            <p className="text-sm text-gray-600">Your order is confirmed and being prepared.</p>
                        </div>
                    )}
                    {Status === "inprogress" && (
                        <div className="border-l-4 border-amber-500 py-1 pl-4">
                            <h2 className="font-semibold text-black">In Progress</h2>
                            <p className="text-sm text-gray-600">Your order is currently being prepared for dispatch.</p>
                        </div>
                    )}
                    {(Status === "cancelled" || Status === "canceled" || Status === "cacelled") && (
                        <div className="border-l-4 border-red-600 py-1 pl-4">
                            <h2 className="font-semibold text-black">Cancelled</h2>
                            <p className="text-sm text-gray-600">This order has been cancelled.</p>
                        </div>
                    )}
                    {Status === "shipped" && (
                        <div className="border-l-4 border-blue-600 py-1 pl-4">
                            <h2 className="font-semibold text-black">Shipped</h2>
                            <p className="text-sm text-gray-600">Your order has been dispatched and is on its way.</p>
                        </div>
                    )}
                    {Status === "delivered" && (
                        <div className="border-l-4 border-green-600 py-1 pl-4">
                            <h2 className="font-semibold text-black">Delivered</h2>
                            <p className="text-sm text-gray-600">Your order has been delivered.</p>
                        </div>
                    )}
                    {!['processing', 'inprogress', 'cancelled', 'canceled', 'cacelled', 'shipped', 'delivered'].includes(Status) && (
                        <div className="border-l-4 border-gray-500 py-1 pl-4">
                            <h2 className="font-semibold text-black">Status unavailable</h2>
                            <p className="text-sm text-gray-600">We don't have a tracking update for this order yet.</p>
                        </div>
                    )}
                </section>
            )}

        </main>
    );

};

export default TrackOrder