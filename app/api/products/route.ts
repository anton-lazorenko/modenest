import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Возвращаем объект с ключом products, чтобы SWR и LatestCollection.tsx работали
    return NextResponse.json({ products });
  } catch (err) {
    console.error("ERROR FETCHING PRODUCTS:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}