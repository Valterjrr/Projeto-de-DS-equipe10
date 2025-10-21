import { styleMap, type TemplateStyle } from "./styles/cvStyles";

export function TemplatePreview({ style }: { style: TemplateStyle }) {
  const { colors } = styleMap[style];
  
  return (
    <div className="w-full h-full bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="h-6 w-3/4 mb-2 rounded" style={{ backgroundColor: colors.primary }} />
        <div className="h-4 w-1/2 rounded" style={{ backgroundColor: colors.accent }} />
      </div>

      {/* Contact Info */}
      <div className="flex gap-4 mb-6">
        <div className="h-3 w-1/4 rounded" style={{ backgroundColor: colors.text, opacity: 0.5 }} />
        <div className="h-3 w-1/4 rounded" style={{ backgroundColor: colors.text, opacity: 0.5 }} />
      </div>

      {/* Summary */}
      <div className="mb-6">
        <div className="h-4 w-1/3 mb-3 rounded" style={{ backgroundColor: colors.accent }} />
        <div className="space-y-2">
          <div className="h-2 w-full rounded" style={{ backgroundColor: colors.text, opacity: 0.3 }} />
          <div className="h-2 w-5/6 rounded" style={{ backgroundColor: colors.text, opacity: 0.3 }} />
          <div className="h-2 w-4/6 rounded" style={{ backgroundColor: colors.text, opacity: 0.3 }} />
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <div className="h-4 w-1/3 mb-3 rounded" style={{ backgroundColor: colors.accent }} />
        <div className="space-y-4">
          <div>
            <div className="h-3 w-2/3 mb-1 rounded" style={{ backgroundColor: colors.primary }} />
            <div className="h-2 w-1/3 mb-2 rounded" style={{ backgroundColor: colors.accent }} />
            <div className="space-y-1">
              <div className="h-2 w-full rounded" style={{ backgroundColor: colors.text, opacity: 0.3 }} />
              <div className="h-2 w-5/6 rounded" style={{ backgroundColor: colors.text, opacity: 0.3 }} />
            </div>
          </div>
          <div>
            <div className="h-3 w-1/2 mb-1 rounded" style={{ backgroundColor: colors.primary }} />
            <div className="h-2 w-1/3 mb-2 rounded" style={{ backgroundColor: colors.accent }} />
            <div className="space-y-1">
              <div className="h-2 w-full rounded" style={{ backgroundColor: colors.text, opacity: 0.3 }} />
              <div className="h-2 w-4/6 rounded" style={{ backgroundColor: colors.text, opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div>
        <div className="h-4 w-1/3 mb-3 rounded" style={{ backgroundColor: colors.accent }} />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-6 w-16 rounded-full"
              style={{ backgroundColor: colors.accent }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
