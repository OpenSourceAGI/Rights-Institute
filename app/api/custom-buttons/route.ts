import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { customButtons } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userButtons = await db
      .select()
      .from(customButtons)
      .where(eq(customButtons.userId, session.user.id))
      .all();

    return NextResponse.json(userButtons);
  } catch (error) {
    console.error('Failed to fetch custom buttons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch custom buttons' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { label, url, description, icon, color, category, isActive } = body;

    if (!label || !url) {
      return NextResponse.json(
        { error: 'Label and URL are required' },
        { status: 400 }
      );
    }

    const id = crypto.randomUUID();
    const now = new Date();

    const newButton = {
      id,
      userId: session.user.id,
      label,
      url,
      description: description || null,
      icon: icon || null,
      color: color || null,
      category: category || null,
      isActive: isActive !== undefined ? isActive : true,
      createdAt: now,
      updatedAt: now,
    };

    await db.insert(customButtons).values(newButton);

    return NextResponse.json(newButton, { status: 201 });
  } catch (error) {
    console.error('Failed to create custom button:', error);
    return NextResponse.json(
      { error: 'Failed to create custom button' },
      { status: 500 }
    );
  }
}
