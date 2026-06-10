import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { budget } = body;

    const items = [
      { item: 'Sofa', category: 'Furniture', cost: Math.round(budget * 0.25) },
      { item: 'Bed', category: 'Furniture', cost: Math.round(budget * 0.2) },
      { item: 'Study Table', category: 'Furniture', cost: Math.round(budget * 0.1) },
      { item: 'Wardrobe', category: 'Furniture', cost: Math.round(budget * 0.15) },
      { item: 'Lighting', category: 'Lighting', cost: Math.round(budget * 0.08) },
      { item: 'Decor', category: 'Decor', cost: Math.round(budget * 0.06) },
      { item: 'Flooring', category: 'Flooring', cost: Math.round(budget * 0.1) },
      { item: 'Curtains', category: 'Decor', cost: Math.round(budget * 0.06) },
    ];

    const totalCost = items.reduce((s, i) => s + i.cost, 0);
    const breakdown = items.map((item) => ({
      ...item,
      percentage: Math.round((item.cost / budget) * 100),
    }));

    const categoryTotals: Record<string, number> = {};
    items.forEach((i) => {
      categoryTotals[i.category] = (categoryTotals[i.category] || 0) + i.cost;
    });
    const pieChartData = Object.entries(categoryTotals).map(([name, cost]) => ({
      name,
      cost,
      percentage: Math.round((cost / budget) * 100),
    }));

    const furniturePct = Math.round(((categoryTotals['Furniture'] || 0) / budget) * 100);

    return NextResponse.json({
      success: true,
      breakdown,
      pieChartData,
      totalCost,
      tips: [
        `You're spending ${furniturePct}% on furniture — consider mid-range options to save ₹${Math.round(budget * 0.1).toLocaleString()}`,
        'Switching to LED lighting can reduce energy costs by up to 80%',
        'Multi-functional furniture can save both space and money',
      ],
    });
  } catch {
    return NextResponse.json({ error: 'Budget optimization failed' }, { status: 500 });
  }
}
