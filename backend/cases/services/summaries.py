def truncate_text(value, max_length=180):
    compact = " ".join(value.split())

    if len(compact) <= max_length:
        return compact

    return f"{compact[: max_length - 3].rstrip()}..."


def generate_case_summary(case):
    note_bodies = [note.body for note in case.notes.all()[:3]]
    note_context = " ".join(note_bodies)

    summary_parts = [
        (
            f"{case.get_priority_display()} priority "
            f"{case.get_category_display().lower()} case: {case.title}."
        ),
        (
            f"Current status is {case.get_status_display().lower()}. "
            f"{truncate_text(case.description)}"
        ),
    ]

    if note_context:
        summary_parts.append(f"Recent notes: {truncate_text(note_context)}")
    else:
        summary_parts.append("No internal notes have been added yet.")

    if case.due_date:
        summary_parts.append(f"Due date: {case.due_date.isoformat()}.")

    return " ".join(summary_parts)
