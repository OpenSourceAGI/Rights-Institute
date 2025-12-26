import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { customButtons } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const button = await db
      .select()
      .from(customButtons)
      .where(
        and(
          eq(customButtons.id, id),
          eq(customButtons.userId, session.user.id)
        )
      )
      .get();

    if (!button) {
      return NextResponse.json({ error: 'Button not found' }, { status: 404 });
    }

    return NextResponse.json(button);
  } catch (error) {
    console.error('Failed to fetch custom button:', error);
    return NextResponse.json(
      { error: 'Failed to fetch custom button' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { label, url, description, icon, color, category, isActive } = body;

    const existingButton = await db
      .select()
      .from(customButtons)
      .where(
        and(
          eq(customButtons.id, id),
          eq(customButtons.userId, session.user.id)
        )
      )
      .get();

    if (!existingButton) {
      return NextResponse.json({ error: 'Button not found' }, { status: 404 });
    }

    const updatedButton = {
      label: label !== undefined ? label : existingButton.label,
      url: url !== undefined ? url : existingButton.url,
      description: description !== undefined ? description : existingButton.description,
      icon: icon !== undefined ? icon : existingButton.icon,
      color: color !== undefined ? color : existingButton.color,
      category: category !== undefined ? category : existingButton.category,
      isActive: isActive !== undefined ? isActive : existingButton.isActive,
      updatedAt: new Date(),
    };

    await db
      .update(customButtons)
      .set(updatedButton)
      .where(
        and(
          eq(customButtons.id, id),
          eq(customButtons.userId, session.user.id)
        )
      );

    return NextResponse.json({ ...existingButton, ...updatedButton });
  } catch (error) {
    console.error('Failed to update custom button:', error);
    return NextResponse.json(
      { error: 'Failed to update custom button' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const existingButton = await db
      .select()
      .from(customButtons)
      .where(
        and(
          eq(customButtons.id, id),
          eq(customButtons.userId, session.user.id)
        )
      )
      .get();

    if (!existingButton) {
      return NextResponse.json({ error: 'Button not found' }, { status: 404 });
    }

    await db
      .delete(customButtons)
      .where(
        and(
          eq(customButtons.id, id),
          eq(customButtons.userId, session.user.id)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete custom button:', error);
    return NextResponse.json(
      { error: 'Failed to delete custom button' },
      { status: 500 }
    );
  }
}
