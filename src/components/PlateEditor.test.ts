import { describe, expect, it } from 'vitest'
import { serializeHtml } from '@udecode/plate-serializer-html'

describe('PlateEditor', () => {
  it('should be sane', () => {
    expect(1).toBe(1)
  })
  it("shouldn't fail on import", () => {
    expect(serializeHtml).toBeDefined()
  })
})
