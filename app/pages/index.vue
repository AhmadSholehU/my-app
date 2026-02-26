<script setup lang="ts">
import { ref, computed } from 'vue'

type Lesson = {
  id: number
  title: string
  description: string
}

const nextId = ref(3)

const lessons = ref<Lesson[]>([
  {
    id: 1,
    title: 'Learn Vue reactivity',
    description: 'Understand ref(), reactive(), and computed().'
  },
  {
    id: 2,
    title: 'Learn Nuxt pages',
    description: 'Use the app/pages/ directory to create routes.'
  }
])

const formTitle = ref('')
const formDescription = ref('')
const editingId = ref<number | null>(null)

const isEditing = computed(() => editingId.value !== null)

function resetForm() {
  formTitle.value = ''
  formDescription.value = ''
  editingId.value = null
}

function createLesson() {
  if (!formTitle.value.trim()) return

  lessons.value.push({
    id: nextId.value++,
    title: formTitle.value.trim(),
    description: formDescription.value.trim()
  })

  resetForm()
}

function startEdit(lesson: Lesson) {
  editingId.value = lesson.id
  formTitle.value = lesson.title
  formDescription.value = lesson.description
}

function updateLesson() {
  if (editingId.value === null) return

  const index = lessons.value.findIndex(l => l.id === editingId.value)
  if (index === -1) return

  lessons.value[index] = {
    ...lessons.value[index],
    title: formTitle.value.trim(),
    description: formDescription.value.trim()
  }

  resetForm()
}

function deleteLesson(id: number) {
  lessons.value = lessons.value.filter(l => l.id !== id)
}
</script>

<template>
  <main class="page">
    <section class="page-header">
      <h1>Nuxt + Vue CRUD Sandbox</h1>
      <p>
        This simple page lets you
        <strong>create</strong>,
        <strong>read</strong>,
        <strong>update</strong>, and
        <strong>delete</strong>
        "lessons" to practice basic Vue and Nuxt concepts.
      </p>
    </section>

    <section class="layout">
      <form class="card form" @submit.prevent="isEditing ? updateLesson() : createLesson()">
        <h2>{{ isEditing ? 'Edit lesson' : 'Create a new lesson' }}</h2>

        <label class="field">
          <span>Title</span>
          <input
            v-model="formTitle"
            type="text"
            placeholder="e.g. Learn components"
          />
        </label>

        <label class="field">
          <span>Description</span>
          <textarea
            v-model="formDescription"
            rows="3"
            placeholder="Short explanation of the lesson"
          />
        </label>

        <div class="buttons">
          <button type="submit" class="btn primary">
            {{ isEditing ? 'Update' : 'Create' }}
          </button>
          <button
            v-if="isEditing"
            type="button"
            class="btn"
            @click="resetForm"
          >
            Cancel
          </button>
        </div>

        <p class="hint">
          - <strong>Create</strong>: Fill the form and click "Create".<br>
          - <strong>Read</strong>: Look at the list on the right.<br>
          - <strong>Update</strong>: Click "Edit" on a lesson, change the fields, then "Update".<br>
          - <strong>Delete</strong>: Click "Delete" on a lesson.
        </p>
      </form>

      <section class="card list">
        <h2>Lessons ({{ lessons.length }})</h2>

        <p v-if="lessons.length === 0" class="empty">
          No lessons yet. Add one using the form.
        </p>

        <ul v-else class="items">
          <li
            v-for="lesson in lessons"
            :key="lesson.id"
            class="item"
          >
            <div class="item-main">
              <h3>{{ lesson.title }}</h3>
              <p>{{ lesson.description }}</p>
            </div>
            <div class="item-actions">
              <button
                class="btn small"
                type="button"
                @click="startEdit(lesson)"
              >
                Edit
              </button>
              <button
                class="btn small danger"
                type="button"
                @click="deleteLesson(lesson.id)"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </section>
    </section>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 2rem 1.5rem 3rem;
  max-width: 960px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #4b5563;
  line-height: 1.4;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.2fr);
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
  }
}

.card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.05);
  border: 1px solid rgba(15, 23, 42, 0.06);
}

.form h2,
.list h2 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.field span {
  font-size: 0.9rem;
  color: #374151;
}

input,
textarea {
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  padding: 0.55rem 0.7rem;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

input:focus,
textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.25);
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.5rem;
}

.btn {
  border-radius: 999px;
  border: 1px solid #d1d5db;
  padding: 0.45rem 1rem;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.05s ease;
}

.btn.primary {
  background: #2563eb;
  border-color: #2563eb;
  color: white;
}

.btn.danger {
  border-color: #f97373;
  color: #b91c1c;
}

.btn.small {
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
}

.btn:hover {
  transform: translateY(-0.5px);
  background: #f9fafb;
}

.btn.primary:hover {
  background: #1d4ed8;
}

.btn.danger:hover {
  background: #fee2e2;
}

.hint {
  margin-top: 1.25rem;
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.5;
}

.list .empty {
  color: #6b7280;
  font-size: 0.9rem;
}

.items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.8rem 0.9rem;
  border-radius: 0.6rem;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
}

.item-main h3 {
  margin: 0 0 0.2rem;
  font-size: 0.98rem;
}

.item-main p {
  margin: 0;
  font-size: 0.9rem;
  color: #4b5563;
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
</style>

