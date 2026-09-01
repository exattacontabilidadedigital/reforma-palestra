/* @ds-bundle: {"format":4,"namespace":"ExattaDesignSystem_128d5b","components":[{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"StatCard","sourcePath":"components/display/StatCard.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"GLYPHS","sourcePath":"components/icons/Icon.jsx"},{"name":"ICON_NAMES","sourcePath":"components/icons/Icon.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"},{"name":"Progress","sourcePath":"components/navigation/Progress.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Notification","sourcePath":"components/notifications/Notification.jsx"},{"name":"NotificationPanel","sourcePath":"components/notifications/NotificationPanel.jsx"}],"sourceHashes":{"components/display/Avatar.jsx":"79836dc71bb9","components/display/Badge.jsx":"64c641dc9abe","components/display/Card.jsx":"ee2bee19c576","components/display/StatCard.jsx":"c134108c2b3c","components/display/Tag.jsx":"9bfdbd040c6a","components/feedback/Alert.jsx":"7cbd46861910","components/feedback/Dialog.jsx":"04b9eeba05e2","components/feedback/Toast.jsx":"ba0f098b6184","components/feedback/Tooltip.jsx":"d45af04aef10","components/forms/Button.jsx":"806c3fabe1c6","components/forms/Checkbox.jsx":"22617d8ea49f","components/forms/IconButton.jsx":"17d687117ba5","components/forms/Input.jsx":"16c1922a05fd","components/forms/Radio.jsx":"c241d8d2895c","components/forms/Select.jsx":"f43571ce3fd7","components/forms/Switch.jsx":"6fea282264bc","components/forms/Textarea.jsx":"637eab33ff04","components/icons/Icon.jsx":"188f170432f2","components/navigation/Progress.jsx":"7bc19bca4225","components/navigation/Tabs.jsx":"68562a1e04db","components/notifications/Notification.jsx":"ceedb24496ef","components/notifications/NotificationPanel.jsx":"9efeee6a0523","ui_kits/onboarding/LoginScreen.jsx":"06fa7ded0887","ui_kits/onboarding/OnboardingWizard.jsx":"87eace5c51ab","ui_kits/portal/ClientesView.jsx":"008e9d49862c","ui_kits/portal/Icons.jsx":"14a7cee5b11e","ui_kits/portal/TaxesView.jsx":"cf9e1b004741","ui_kits/portal/TopNav.jsx":"a769b1e8a64c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ExattaDesignSystem_128d5b = window.ExattaDesignSystem_128d5b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/display/Avatar.jsx
try { (() => {
const sizes = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56
};
// Deterministic tint from a name (navy / mint / blue / amber families).
const palette = [['var(--navy-100)', 'var(--navy-700)'], ['var(--teal-100)', 'var(--teal-700)'], ['var(--info-100)', 'var(--info-600)'], ['var(--warning-100)', 'var(--warning-700)']];
function initials(name = '') {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] || '') + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
}

/** User/company avatar with image or coloured initials. */
function Avatar({
  name = '',
  src,
  size = 'md',
  square = false,
  style
}) {
  const dim = sizes[size] || sizes.md;
  const idx = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length;
  const [bg, fg] = palette[idx];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto',
      width: dim,
      height: dim,
      borderRadius: square ? 'var(--radius-md)' : '50%',
      background: src ? 'var(--surface-sunken)' : bg,
      color: fg,
      overflow: 'hidden',
      font: `var(--fw-bold) ${dim * 0.36}px/1 var(--font-body)`,
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
const tones = {
  neutral: {
    bg: 'var(--neutral-100)',
    fg: 'var(--neutral-700)',
    dot: 'var(--neutral-400)'
  },
  brand: {
    bg: 'var(--brand-subtle)',
    fg: 'var(--navy-700)',
    dot: 'var(--navy-500)'
  },
  positive: {
    bg: 'var(--positive-50)',
    fg: 'var(--positive-700)',
    dot: 'var(--positive-500)'
  },
  negative: {
    bg: 'var(--negative-50)',
    fg: 'var(--negative-700)',
    dot: 'var(--negative-500)'
  },
  warning: {
    bg: 'var(--warning-50)',
    fg: 'var(--warning-700)',
    dot: 'var(--warning-500)'
  },
  info: {
    bg: 'var(--info-50)',
    fg: 'var(--info-600)',
    dot: 'var(--info-500)'
  },
  highlight: {
    bg: 'var(--teal-50)',
    fg: 'var(--teal-700)',
    dot: 'var(--teal-400)'
  }
};

/** Status pill. `dot` shows a leading status dot. */
function Badge({
  children,
  tone = 'neutral',
  dot = false,
  size = 'md',
  style
}) {
  const t = tones[tone] || tones.neutral;
  const pad = size === 'sm' ? '2px 8px' : '4px 10px';
  const fs = size === 'sm' ? 'var(--text-2xs)' : 'var(--text-xs)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: pad,
      background: t.bg,
      color: t.fg,
      borderRadius: 'var(--radius-pill)',
      font: `var(--fw-semibold) ${fs}/1 var(--font-body)`,
      letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: t.dot
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const pads = {
  sm: 'var(--space-4)',
  md: 'var(--space-6)',
  lg: 'var(--space-8)'
};

/** Surface container. `interactive` adds hover lift. */
function Card({
  children,
  padding = 'md',
  interactive = false,
  elevation = 'sm',
  style,
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const shadowMap = {
    none: 'none',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: pads[padding] || pads.md,
      boxShadow: interactive && hover ? 'var(--shadow-lg)' : shadowMap[elevation],
      transform: interactive && hover ? 'translateY(-2px)' : 'none',
      transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
      cursor: interactive ? 'pointer' : 'default',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/StatCard.jsx
try { (() => {
const trendColor = {
  up: 'var(--credit)',
  down: 'var(--debit)',
  flat: 'var(--text-muted)'
};
const toneMap = {
  default: {
    accent: 'var(--accent)',
    surface: 'var(--navy-50)'
  },
  brand: {
    accent: 'var(--brand)',
    surface: 'var(--brand-subtle)'
  },
  credit: {
    accent: 'var(--credit)',
    surface: 'var(--credit-surface)'
  },
  debit: {
    accent: 'var(--debit)',
    surface: 'var(--debit-surface)'
  },
  pending: {
    accent: 'var(--pending)',
    surface: 'var(--pending-surface)'
  },
  info: {
    accent: 'var(--info-500)',
    surface: 'var(--info-50)'
  },
  highlight: {
    accent: 'var(--teal-600)',
    surface: 'var(--teal-50)'
  },
  accent: {
    accent: 'var(--mint-500)',
    surface: 'var(--mint-50)'
  },
  neutral: {
    accent: 'var(--text-muted)',
    surface: 'var(--surface-sunken)'
  }
};

/**
 * Metric/KPI tile. `compact` renders the dense horizontal variant
 * (icon chip · big number · label) used across the backoffice.
 */
function StatCard({
  label,
  value,
  unit = 'R$',
  trend,
  trendValue,
  icon,
  tone = 'default',
  compact = false,
  colorValue = false,
  style
}) {
  const t = toneMap[tone] || toneMap.default;
  if (compact) {
    return /*#__PURE__*/React.createElement(__ds_scope.Card, {
      padding: "sm",
      elevation: "sm",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        minWidth: 132,
        background: `linear-gradient(105deg, var(--surface-card) 55%, ${t.surface})`,
        ...style
      }
    }, icon && /*#__PURE__*/React.createElement("span", {
      style: {
        flex: '0 0 auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 'var(--radius-md)',
        background: t.surface,
        color: t.accent
      }
    }, icon), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--fw-extra) var(--text-xl)/1 var(--font-display)',
        letterSpacing: '-0.02em',
        color: colorValue ? t.accent : 'var(--text-strong)'
      }
    }, value), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--fw-medium) var(--text-xs)/1.2 var(--font-body)',
        color: 'var(--text-muted)'
      }
    }, label)));
  }
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    padding: "md",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      minWidth: 200,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) var(--text-xs)/1 var(--font-body)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      borderRadius: 'var(--radius-sm)',
      background: t.surface,
      color: t.accent
    }
  }, icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-medium) var(--text-md)/1 var(--font-mono)',
      color: 'var(--text-muted)'
    }
  }, unit), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-bold) var(--text-2xl)/1 var(--font-mono)',
      color: 'var(--text-strong)',
      letterSpacing: '-0.02em'
    }
  }, value)), trend && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: trendColor[trend]
    }
  }, trend === 'up' && /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "23 6 13.5 15.5 8.5 10.5 1 18"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "17 6 23 6 23 12"
  })), trend === 'down' && /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "23 18 13.5 8.5 8.5 13.5 1 6"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "17 18 23 18 23 12"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) var(--text-sm)/1 var(--font-mono)',
      color: trendColor[trend]
    }
  }, trendValue), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-xs)/1 var(--font-body)',
      color: 'var(--text-subtle)'
    }
  }, "vs. m\xEAs anterior")));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
/** Removable/selectable tag chip. */
function Tag({
  children,
  onRemove,
  icon,
  selected = false,
  onClick,
  style
}) {
  const clickable = !!onClick;
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 10px',
      background: selected ? 'var(--brand-subtle)' : 'var(--surface-card)',
      color: selected ? 'var(--navy-700)' : 'var(--text-body)',
      border: `1px solid ${selected ? 'var(--navy-300)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-sm)',
      font: 'var(--fw-medium) var(--text-xs)/1 var(--font-body)',
      cursor: clickable ? 'pointer' : 'default',
      whiteSpace: 'nowrap',
      transition: 'background var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--text-muted)'
    }
  }, icon), children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    "aria-label": "Remover",
    style: {
      display: 'inline-flex',
      border: 'none',
      background: 'transparent',
      padding: 0,
      marginLeft: 2,
      cursor: 'pointer',
      color: 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
const tones = {
  info: {
    bg: 'var(--info-50)',
    border: 'var(--info-100)',
    fg: 'var(--info-600)',
    title: 'var(--info-600)'
  },
  positive: {
    bg: 'var(--positive-50)',
    border: 'var(--positive-100)',
    fg: 'var(--positive-700)',
    title: 'var(--positive-700)'
  },
  warning: {
    bg: 'var(--warning-50)',
    border: 'var(--warning-100)',
    fg: 'var(--warning-700)',
    title: 'var(--warning-700)'
  },
  negative: {
    bg: 'var(--negative-50)',
    border: 'var(--negative-100)',
    fg: 'var(--negative-700)',
    title: 'var(--negative-700)'
  }
};
const icons = {
  info: 'M12 16v-4 M12 8h.01',
  positive: 'M20 6 9 17l-5-5',
  warning: 'M12 9v4 M12 17h.01',
  negative: 'M15 9l-6 6 M9 9l6 6'
};

/** Inline banner for contextual messages. */
function Alert({
  title,
  children,
  tone = 'info',
  onClose,
  style
}) {
  const t = tones[tone] || tones.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      display: 'flex',
      gap: 12,
      padding: 'var(--space-4)',
      background: t.bg,
      border: `1px solid ${t.border}`,
      borderRadius: 'var(--radius-md)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      color: t.fg,
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, tone === 'positive' ? /*#__PURE__*/React.createElement("path", {
    d: icons.positive
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: icons[tone]
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) var(--text-sm)/1.4 var(--font-body)',
      color: t.title
    }
  }, title), children && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-sm)/1.5 var(--font-body)',
      color: 'var(--text-body)'
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fechar",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--text-subtle)',
      padding: 0,
      height: 20
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
/** Modal dialog. Render conditionally on `open`. */
function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = 460
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === 'Escape' && onClose && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-4)',
      background: 'rgba(23, 23, 28, 0.45)',
      backdropFilter: 'blur(3px)',
      animation: 'exatta-fade var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: '100%',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-xl)',
      padding: 'var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      animation: 'exatta-pop var(--dur-slow) var(--ease-spring)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--type-h3)',
      color: 'var(--text-strong)'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--text-sm)/1.55 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, description)), children && /*#__PURE__*/React.createElement("div", null, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'flex-end',
      marginTop: 'var(--space-2)'
    }
  }, footer), /*#__PURE__*/React.createElement("style", null, `
          @keyframes exatta-fade { from { opacity: 0 } to { opacity: 1 } }
          @keyframes exatta-pop { from { opacity: 0; transform: translateY(8px) scale(0.98) } to { opacity: 1; transform: none } }
        `)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const tones = {
  default: {
    accent: 'var(--brand)'
  },
  positive: {
    accent: 'var(--positive-500)'
  },
  negative: {
    accent: 'var(--negative-500)'
  },
  warning: {
    accent: 'var(--warning-500)'
  }
};

/** Single toast notification (compose your own stack/container). */
function Toast({
  title,
  description,
  tone = 'default',
  icon,
  onClose,
  style
}) {
  const t = tones[tone] || tones.default;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      minWidth: 300,
      maxWidth: 400,
      padding: 'var(--space-4)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      borderLeft: `3px solid ${t.accent}`,
      animation: 'exatta-toast var(--dur-slow) var(--ease-spring)',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.accent,
      flex: '0 0 auto',
      marginTop: 1
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) var(--text-sm)/1.4 var(--font-body)',
      color: 'var(--text-strong)'
    }
  }, title), description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-xs)/1.5 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, description)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fechar",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--text-subtle)',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))), /*#__PURE__*/React.createElement("style", null, `@keyframes exatta-toast { from { opacity: 0; transform: translateX(16px) } to { opacity: 1; transform: none } }`));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/** Hover tooltip. Wraps its child trigger. */
function Tooltip({
  label,
  children,
  side = 'top'
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: 8
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: 8
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: 8
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: 8
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      zIndex: 500,
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      padding: '6px 10px',
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-inverse)',
      borderRadius: 'var(--radius-sm)',
      font: 'var(--fw-medium) var(--text-xs)/1.3 var(--font-body)',
      boxShadow: 'var(--shadow-md)',
      animation: 'exatta-tip var(--dur-fast) var(--ease-out)',
      ...pos[side]
    }
  }, label, /*#__PURE__*/React.createElement("style", null, `@keyframes exatta-tip { from { opacity: 0 } to { opacity: 1 } }`)));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    padding: '0 var(--space-3)',
    height: 34,
    font: 'var(--text-sm)',
    gap: 6,
    radius: 'var(--radius-sm)'
  },
  md: {
    padding: '0 var(--space-5)',
    height: 42,
    font: 'var(--text-sm)',
    gap: 8,
    radius: 'var(--radius-md)'
  },
  lg: {
    padding: '0 var(--space-6)',
    height: 50,
    font: 'var(--text-base)',
    gap: 10,
    radius: 'var(--radius-md)'
  }
};
const variants = {
  primary: {
    background: 'var(--brand)',
    color: 'var(--on-brand)',
    border: '1px solid transparent',
    boxShadow: 'var(--shadow-brand)',
    hover: {
      background: 'var(--brand-hover)'
    }
  },
  secondary: {
    background: 'var(--surface-card)',
    color: 'var(--text-strong)',
    border: '1px solid var(--border-default)',
    boxShadow: 'var(--shadow-xs)',
    hover: {
      background: 'var(--surface-sunken)'
    }
  },
  ghost: {
    background: 'transparent',
    color: 'var(--brand)',
    border: '1px solid transparent',
    hover: {
      background: 'var(--brand-subtle)'
    }
  },
  danger: {
    background: 'var(--negative-50)',
    color: 'var(--negative-700)',
    border: '1px solid var(--red-200)',
    hover: {
      background: 'var(--negative-100)'
    }
  }
};

/**
 * Exatta primary action button.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const isDisabled = disabled || loading;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    onClick: onClick,
    disabled: isDisabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      width: fullWidth ? '100%' : 'auto',
      font: `var(--fw-semibold) ${s.font}/1 var(--font-body)`,
      letterSpacing: 'var(--tracking-snug)',
      borderRadius: s.radius,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      opacity: isDisabled ? 0.5 : 1,
      transform: hover && !isDisabled ? 'translateY(-1px)' : 'none',
      ...v,
      ...(hover && !isDisabled ? v.hover : null),
      ...style
    }
  }, rest), loading && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: '50%',
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      display: 'inline-block',
      animation: 'exatta-spin 0.7s linear infinite'
    }
  }), !loading && iconLeft, children && /*#__PURE__*/React.createElement("span", null, children), !loading && iconRight, /*#__PURE__*/React.createElement("style", null, `@keyframes exatta-spin{to{transform:rotate(360deg)}}`));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** Checkbox with label. Controlled via `checked` / `onChange`. */
function Checkbox({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  id,
  style
}) {
  const autoId = React.useId();
  const inputId = id || autoId;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      flex: '0 0 auto',
      width: 20,
      height: 20,
      marginTop: 1,
      borderRadius: 'var(--radius-xs)',
      border: `1.5px solid ${checked ? 'var(--brand)' : 'var(--border-strong)'}`,
      background: checked ? 'var(--brand)' : 'var(--surface-card)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: inputId,
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: 'inherit'
    }
  }), checked && /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), (label || description) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-medium) var(--text-sm)/1.35 var(--font-body)',
      color: 'var(--text-strong)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-xs)/1.4 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: 34,
  md: 42,
  lg: 50
};
const variants = {
  primary: {
    background: 'var(--brand)',
    color: 'var(--on-brand)',
    hover: 'var(--brand-hover)',
    border: 'transparent'
  },
  secondary: {
    background: 'var(--surface-card)',
    color: 'var(--text-body)',
    hover: 'var(--surface-sunken)',
    border: 'var(--border-default)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-muted)',
    hover: 'var(--surface-sunken)',
    border: 'transparent'
  }
};

/** Square icon-only button. */
function IconButton({
  children,
  label,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dim = sizes[size] || sizes.md;
  const v = variants[variant] || variants.ghost;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    onClick: onClick,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      borderRadius: 'var(--radius-md)',
      background: hover && !disabled ? v.hover : v.background,
      color: v.color,
      border: `1px solid ${v.border}`,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Labelled text input with optional prefix/suffix, hint and error. */
function Input({
  label,
  hint,
  error,
  prefix,
  suffix,
  size = 'md',
  id,
  type = 'text',
  disabled = false,
  required = false,
  mono = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId();
  const inputId = id || autoId;
  const height = size === 'sm' ? 36 : size === 'lg' ? 50 : 44;
  const borderColor = error ? 'var(--negative-500)' : focus ? 'var(--accent)' : 'var(--border-default)';
  const ring = error ? 'var(--ring-error)' : focus ? 'var(--ring-brand)' : 'none';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: '100%',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-body)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--negative-500)'
    }
  }, " *")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height,
      padding: '0 var(--space-3)',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: ring,
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-subtle)',
      display: 'inline-flex'
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    disabled: disabled,
    required: required,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      font: mono ? `var(--fw-medium) var(--text-sm)/1.4 var(--font-mono)` : `var(--fw-regular) var(--text-sm)/1.4 var(--font-body)`,
      color: 'var(--text-strong)'
    }
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-subtle)',
      display: 'inline-flex'
    }
  }, suffix)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-xs)/1.4 var(--font-body)',
      color: error ? 'var(--negative-600)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** Radio group. Options = array of {value,label,description?} or strings. */
function Radio({
  options = [],
  value,
  onChange,
  name,
  disabled = false,
  style
}) {
  const groupName = React.useMemo(() => name || `exatta-radio-${Math.random().toString(36).slice(2, 8)}`, [name]);
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      ...style
    }
  }, options.map(o => {
    const val = typeof o === 'string' ? o : o.value;
    const lbl = typeof o === 'string' ? o : o.label;
    const desc = typeof o === 'string' ? null : o.description;
    const selected = value === val;
    return /*#__PURE__*/React.createElement("label", {
      key: val,
      style: {
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: '0 0 auto',
        width: 20,
        height: 20,
        marginTop: 1,
        borderRadius: '50%',
        border: `1.5px solid ${selected ? 'var(--brand)' : 'var(--border-strong)'}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'border-color var(--dur-fast) var(--ease-out)'
      }
    }, selected && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: 'var(--brand)'
      }
    }), /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: groupName,
      value: val,
      checked: selected,
      onChange: () => onChange && onChange(val),
      disabled: disabled,
      style: {
        position: 'absolute',
        opacity: 0,
        width: 0,
        height: 0
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--fw-medium) var(--text-sm)/1.35 var(--font-body)',
        color: 'var(--text-strong)'
      }
    }, lbl), desc && /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-xs)/1.4 var(--font-body)',
        color: 'var(--text-muted)'
      }
    }, desc)));
  }));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native-select wrapper matching Input styling. */
function Select({
  label,
  hint,
  error,
  options = [],
  placeholder,
  size = 'md',
  id,
  value,
  onChange,
  disabled = false,
  required = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId();
  const inputId = id || autoId;
  const height = size === 'sm' ? 36 : size === 'lg' ? 50 : 44;
  const borderColor = error ? 'var(--negative-500)' : focus ? 'var(--accent)' : 'var(--border-default)';
  const ring = error ? 'var(--ring-error)' : focus ? 'var(--ring-brand)' : 'none';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: '100%',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-body)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--negative-500)'
    }
  }, " *")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: inputId,
    value: value,
    onChange: onChange,
    disabled: disabled,
    required: required,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      height,
      padding: '0 var(--space-8) 0 var(--space-3)',
      appearance: 'none',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: ring,
      outline: 'none',
      font: 'var(--fw-regular) var(--text-sm)/1 var(--font-body)',
      color: value ? 'var(--text-strong)' : 'var(--text-subtle)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => {
    const val = typeof o === 'string' ? o : o.value;
    const lbl = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lbl);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-xs)/1.4 var(--font-body)',
      color: error ? 'var(--negative-600)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/** On/off toggle switch. */
function Switch({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = 'md',
  id,
  style
}) {
  const autoId = React.useId();
  const inputId = id || autoId;
  const w = size === 'sm' ? 36 : 44;
  const h = size === 'sm' ? 20 : 24;
  const knob = h - 6;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: 'inline-flex',
      gap: 10,
      alignItems: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: w,
      height: h,
      borderRadius: 'var(--radius-pill)',
      flex: '0 0 auto',
      background: checked ? 'var(--brand)' : 'var(--neutral-300)',
      transition: 'background var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: inputId,
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: 'inherit'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? w - knob - 3 : 3,
      width: knob,
      height: knob,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left var(--dur-base) var(--ease-spring)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-medium) var(--text-sm)/1.35 var(--font-body)',
      color: 'var(--text-strong)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Multi-line text field. */
function Textarea({
  label,
  hint,
  error,
  rows = 4,
  id,
  disabled = false,
  required = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId();
  const inputId = id || autoId;
  const borderColor = error ? 'var(--negative-500)' : focus ? 'var(--accent)' : 'var(--border-default)';
  const ring = error ? 'var(--ring-error)' : focus ? 'var(--ring-brand)' : 'none';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: '100%',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-body)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--negative-500)'
    }
  }, " *")), /*#__PURE__*/React.createElement("textarea", _extends({
    id: inputId,
    rows: rows,
    disabled: disabled,
    required: required,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      resize: 'vertical',
      padding: 'var(--space-3)',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: ring,
      outline: 'none',
      font: 'var(--fw-regular) var(--text-sm)/1.5 var(--font-body)',
      color: 'var(--text-strong)',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-xs)/1.4 var(--font-body)',
      color: error ? 'var(--negative-600)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/icons/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Exatta icon set — Lucide-style, 24px grid, round caps/joins.
   Line icons only; colour follows `currentColor`, size via `size`. */
const GLYPHS = {
  home: ['M3 10.5 12 3l9 7.5', 'M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5'],
  file: ['M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z', 'M14 3v5h5'],
  receipt: ['M5 3v18l2-1 2 1 2-1 2 1 2-1 2 1V3l-2 1-2-1-2 1-2-1-2 1z', 'M9 8h6', 'M9 12h6'],
  chart: ['M3 3v18h18', 'M7 15l3-4 3 2 4-6'],
  wallet: ['M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v3', 'M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-3', 'M18 12h3v4h-3a2 2 0 0 1 0-4z'],
  bell: ['M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9', 'M13.7 21a2 2 0 0 1-3.4 0'],
  settings: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 7 2.6 1.6 1.6 0 0 0 8 1.1V1a2 2 0 1 1 4 0v.1A1.6 1.6 0 0 0 15 2.6a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V7a1.6 1.6 0 0 0 1.1 1.5H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z'],
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'm21 21-4.3-4.3'],
  download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
  upload: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'],
  plus: ['M12 5v14', 'M5 12h14'],
  check: ['M20 6 9 17l-5-5'],
  chevronRight: ['m9 6 6 6-6 6'],
  chevronDown: ['m6 9 6 6 6-6'],
  calendar: ['M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M3 9h18', 'M8 3v4', 'M16 3v4'],
  logout: ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'm16 17 5-5-5-5', 'M21 12H9'],
  message: ['M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
  building: ['M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16', 'M16 8h2a2 2 0 0 1 2 2v11', 'M2 21h20', 'M8 7h2', 'M8 11h2', 'M8 15h2'],
  shield: ['M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z', 'm9 12 2 2 4-4'],
  clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 7v5l3 2'],
  whatsapp: ['M12 21a9 9 0 1 0-8-4.7L3 21l4.9-1a9 9 0 0 0 4.1 1z', 'M8.5 9.5c0 4 3 6.5 6 6.5.7 0 1.3-.6 1.3-1.1 0-.3-.2-.6-.5-.8l-1.4-.7a.7.7 0 0 0-.8.1l-.4.4a4.4 4.4 0 0 1-1.8-1.8l.4-.4a.7.7 0 0 0 .1-.8l-.7-1.4c-.2-.3-.5-.5-.8-.5-.5 0-1.1.6-1.1 1.3z'],
  sparkles: ['M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z', 'M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z'],
  moon: ['M21 12.8A8 8 0 1 1 11.2 3 6 6 0 0 0 21 12.8z'],
  grid: ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M14 14h6v6h-6z'],
  filter: ['M3 5h18l-7 8v6l-4 2v-8z'],
  sort: ['M8 4v16', 'm4 8 4-4 4 4', 'M16 20V4', 'm20 16-4 4-4-4'],
  dots: ['M12 6h.01', 'M12 12h.01', 'M12 18h.01'],
  checkCircle: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'm8.5 12 2.5 2.5 4.5-5'],
  xCircle: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'm15 9-6 6', 'm9 9 6 6'],
  x: ['M18 6 6 18', 'M6 6l12 12'],
  users: ['M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1', 'M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', 'M21 20v-1a4 4 0 0 0-3-3.9', 'M15 4.1a4 4 0 0 1 0 7.8'],
  briefcase: ['M4 8h16a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a1 1 0 0 1 1-1z', 'M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2'],
  refresh: ['M21 12a9 9 0 1 1-3-6.7L21 8', 'M21 3v5h-5'],
  pin: ['M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z', 'M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z']
};

/** Name of any glyph in the Exatta icon set. */
const ICON_NAMES = Object.keys(GLYPHS);

/** Single-glyph line icon. Colour = currentColor. */
function Icon({
  name,
  size = 20,
  stroke = 2,
  title,
  style,
  ...rest
}) {
  const paths = GLYPHS[name];
  if (!paths) {
    if (typeof console !== 'undefined') console.warn(`[Icon] unknown glyph: "${name}"`);
    return null;
  }
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    role: title ? 'img' : undefined,
    "aria-hidden": title ? undefined : true,
    "aria-label": title,
    style: {
      display: 'inline-block',
      flex: 'none',
      ...style
    }
  }, rest), title ? /*#__PURE__*/React.createElement("title", null, title) : null, paths.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d
  })));
}
Object.assign(__ds_scope, { GLYPHS, ICON_NAMES, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Progress.jsx
try { (() => {
const tones = {
  brand: 'var(--brand)',
  positive: 'var(--positive-500)',
  warning: 'var(--warning-500)',
  negative: 'var(--negative-500)',
  highlight: 'var(--teal-400)'
};

/** Linear progress bar. `value` 0–100. */
function Progress({
  value = 0,
  tone = 'brand',
  showLabel = false,
  label,
  size = 'md',
  style
}) {
  const h = size === 'sm' ? 6 : size === 'lg' ? 12 : 8;
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: '100%',
      ...style
    }
  }, (showLabel || label) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      font: 'var(--fw-medium) var(--text-xs)/1 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, label), showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: 'var(--text-body)'
    }
  }, pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: h,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-sunken)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      borderRadius: 'var(--radius-pill)',
      background: tones[tone] || tones.brand,
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { Progress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Progress.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/** Horizontal tabs. Controlled via `value`/`onChange`. */
function Tabs({
  tabs = [],
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1px solid var(--border-subtle)',
      ...style
    }
  }, tabs.map(t => {
    const val = typeof t === 'string' ? t : t.value;
    const lbl = typeof t === 'string' ? t : t.label;
    const count = typeof t === 'string' ? null : t.count;
    const active = value === val;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(val),
      style: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 14px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        font: `var(--fw-semibold) var(--text-sm)/1 var(--font-body)`,
        color: active ? 'var(--brand)' : 'var(--text-muted)',
        transition: 'color var(--dur-fast) var(--ease-out)'
      }
    }, lbl, count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--fw-bold) var(--text-2xs)/1 var(--font-mono)',
        padding: '2px 6px',
        borderRadius: 'var(--radius-pill)',
        background: active ? 'var(--brand-subtle)' : 'var(--surface-sunken)',
        color: active ? 'var(--navy-700)' : 'var(--text-muted)'
      }
    }, count), active && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 8,
        right: 8,
        bottom: -1,
        height: 2,
        background: 'var(--brand)',
        borderRadius: '2px 2px 0 0'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/notifications/Notification.jsx
try { (() => {
const tones = {
  brand: {
    fg: 'var(--brand)',
    bg: 'var(--brand-subtle)'
  },
  positive: {
    fg: 'var(--positive-600)',
    bg: 'var(--positive-50)'
  },
  warning: {
    fg: 'var(--warning-600)',
    bg: 'var(--warning-50)'
  },
  negative: {
    fg: 'var(--negative-600)',
    bg: 'var(--negative-50)'
  },
  info: {
    fg: 'var(--info-600)',
    bg: 'var(--info-50)'
  },
  highlight: {
    fg: 'var(--teal-600)',
    bg: 'var(--teal-50)'
  },
  neutral: {
    fg: 'var(--text-muted)',
    bg: 'var(--surface-sunken)'
  }
};

/** A single notification row. `icon` = glyph name or node. */
function Notification({
  title,
  description,
  time,
  tone = 'brand',
  icon = 'bell',
  unread = false,
  actions,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const t = tones[tone] || tones.brand;
  return /*#__PURE__*/React.createElement("div", {
    role: onClick ? 'button' : undefined,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      gap: 12,
      padding: '13px 14px',
      cursor: onClick ? 'pointer' : 'default',
      background: unread ? 'var(--brand-subtle)' : hover ? 'var(--surface-sunken)' : 'transparent',
      transition: 'background var(--dur-fast) var(--ease-out)',
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      width: 38,
      height: 38,
      borderRadius: 'var(--radius-md)',
      background: t.bg,
      color: t.fg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, typeof icon === 'string' ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 19
  }) : icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--fw-${unread ? 'bold' : 'semibold'}) var(--text-sm)/1.35 var(--font-body)`,
      color: 'var(--text-strong)'
    }
  }, title), description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-xs)/1.5 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, description), time && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-medium) var(--text-2xs)/1 var(--font-body)',
      color: 'var(--text-subtle)',
      marginTop: 3,
      letterSpacing: '0.01em'
    }
  }, time), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 8
    }
  }, actions)), unread && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--brand)',
      marginTop: 6,
      alignSelf: 'flex-start'
    }
  }));
}
Object.assign(__ds_scope, { Notification });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/notifications/Notification.jsx", error: String((e && e.message) || e) }); }

// components/notifications/NotificationPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Notifications dropdown panel: header · Todas/Não lidas filter · list · footer.
 * Manages read + filter state internally; `items` is the data.
 */
function NotificationPanel({
  items = [],
  title = 'Notificações',
  footerLabel = 'Ver todas as notificações',
  onFooterClick,
  onSelect,
  width = 384,
  style
}) {
  const [read, setRead] = React.useState(() => new Set());
  const [tab, setTab] = React.useState('todas');
  const isUnread = n => n.unread && !read.has(n.id);
  const unreadCount = items.filter(isUnread).length;
  const shown = tab === 'nao' ? items.filter(isUnread) : items;
  const markAll = () => setRead(new Set(items.map(n => n.id)));
  const open = n => {
    setRead(r => new Set(r).add(n.id));
    onSelect && onSelect(n);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      maxWidth: '100%',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-xl)',
      border: '1px solid var(--border-subtle)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '16px 18px 12px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: 'var(--type-h3)',
      color: 'var(--text-strong)'
    }
  }, title), unreadCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-bold) var(--text-2xs)/1 var(--font-body)',
      color: '#fff',
      background: 'var(--brand)',
      padding: '3px 7px',
      borderRadius: 'var(--radius-pill)'
    }
  }, unreadCount), /*#__PURE__*/React.createElement("button", {
    onClick: markAll,
    disabled: !unreadCount,
    style: {
      marginLeft: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      border: 'none',
      background: 'transparent',
      cursor: unreadCount ? 'pointer' : 'default',
      font: 'var(--fw-semibold) var(--text-xs)/1 var(--font-body)',
      color: unreadCount ? 'var(--text-link)' : 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14
  }), " Marcar todas como lidas")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      padding: '0 12px 8px'
    }
  }, [['todas', 'Todas'], ['nao', 'Não lidas']].map(([id, lbl]) => {
    const active = tab === id;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => setTab(id),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 'var(--radius-pill)',
        background: active ? 'var(--brand-subtle)' : 'transparent',
        color: active ? 'var(--brand)' : 'var(--text-muted)',
        font: 'var(--fw-semibold) var(--text-xs)/1 var(--font-body)'
      }
    }, lbl, id === 'nao' && unreadCount > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--fw-bold) 10px/1 var(--font-body)',
        opacity: 0.8
      }
    }, unreadCount));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-subtle)',
      maxHeight: 420,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }
  }, shown.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      padding: '40px 20px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: '50%',
      background: 'var(--surface-sunken)',
      color: 'var(--text-subtle)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "bell",
    size: 24
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) var(--text-sm)/1.4 var(--font-body)',
      color: 'var(--text-body)'
    }
  }, "Tudo em dia!"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-xs)/1.5 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, "Voc\xEA n\xE3o tem novas notifica\xE7\xF5es.")) : shown.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: n.id,
    style: {
      borderTop: i ? '1px solid var(--border-subtle)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Notification, _extends({}, n, {
    unread: isUnread(n),
    onClick: () => open(n)
  }))))), /*#__PURE__*/React.createElement("button", {
    onClick: onFooterClick,
    style: {
      borderTop: '1px solid var(--border-subtle)',
      border: 'none',
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: 'var(--border-subtle)',
      padding: '13px',
      background: 'var(--surface-card)',
      cursor: 'pointer',
      width: '100%',
      font: 'var(--fw-semibold) var(--text-sm)/1 var(--font-body)',
      color: 'var(--text-link)'
    }
  }, footerLabel));
}
Object.assign(__ds_scope, { NotificationPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/notifications/NotificationPanel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/onboarding/LoginScreen.jsx
try { (() => {
const React = window.React;
const {
  Input,
  Button,
  Checkbox
} = window.ExattaDesignSystem_128d5b;
const {
  Icons
} = window;

// Left brand panel + right login form. Modernized replacement for the current
// bare Exatta GED login screen.
function LoginScreen({
  onLogin
}) {
  const [remember, setRemember] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.05fr 1fr',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding: 'var(--space-16)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'linear-gradient(155deg, var(--navy-800) 0%, var(--navy-950) 100%)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.5,
      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)',
      backgroundSize: '22px 22px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/exatta-logo-white.png",
    alt: "Exatta Contabilidade Digital",
    style: {
      height: 42,
      width: 'auto',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      maxWidth: 380
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--fw-extra) var(--text-3xl)/1.08 var(--font-display)',
      letterSpacing: '-0.03em'
    }
  }, "Sua contabilidade, 100% digital."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--text-md)/1.6 var(--font-body)',
      color: 'rgba(255,255,255,0.82)'
    }
  }, "Impostos, folha e obriga\xE7\xF5es em dia \u2014 sem burocracia, com gente de verdade te atendendo."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginTop: 8
    }
  }, ['Envio de documentos em segundos', 'Impostos calculados e conferidos', 'Fale com seu contador quando quiser'].map(t => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      font: 'var(--fw-medium) var(--text-sm)/1.3 var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.18)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, Icons.check({
    size: 13
  })), t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      font: 'var(--text-xs)/1 var(--font-body)',
      color: 'rgba(255,255,255,0.6)'
    }
  }, "Exatta Contabilidade Digital \xB7 CRC ativo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      placeItems: 'center',
      padding: 'var(--space-8)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 360,
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--type-h2)',
      color: 'var(--text-strong)'
    }
  }, "Entrar na sua conta"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--text-sm)/1.5 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, "Acesse o portal e o Exatta GED com suas credenciais.")), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onLogin();
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "E-mail",
    type: "email",
    placeholder: "voce@empresa.com.br",
    prefix: Icons.message({
      size: 16
    }),
    defaultValue: "joao@padariareal.com.br"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Senha",
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    prefix: Icons.shield({
      size: 16
    }),
    defaultValue: "senha123"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Lembrar de mim",
    checked: remember,
    onChange: e => setRemember(e.target.checked)
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: 'var(--fw-semibold) var(--text-sm)/1 var(--font-body)',
      color: 'var(--text-link)',
      textDecoration: 'none'
    }
  }, "Esqueci a senha")), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    size: "lg",
    fullWidth: true,
    iconRight: Icons.chevronR({
      size: 17
    })
  }, "Entrar")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-sm)/1.5 var(--font-body)',
      color: 'var(--text-muted)',
      textAlign: 'center'
    }
  }, "Ainda n\xE3o \xE9 cliente? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--text-link)',
      fontWeight: 600,
      textDecoration: 'none'
    }
  }, "Abra sua empresa com a Exatta")))));
}
window.LoginScreen = LoginScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/onboarding/LoginScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/onboarding/OnboardingWizard.jsx
try { (() => {
const React = window.React;
const {
  Input,
  Select,
  Radio,
  Button,
  Progress,
  Card,
  Badge
} = window.ExattaDesignSystem_128d5b;
const {
  Icons
} = window;
const STEPS = [{
  id: 0,
  label: 'Dados da empresa',
  desc: 'CNPJ e contato'
}, {
  id: 1,
  label: 'Regime tributário',
  desc: 'Enquadramento fiscal'
}, {
  id: 2,
  label: 'Documentos',
  desc: 'Envio inicial'
}, {
  id: 3,
  label: 'Tudo pronto',
  desc: 'Revisão'
}];
function Rail({
  step
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 300,
      flex: '0 0 300px',
      padding: 'var(--space-10) var(--space-8)',
      background: 'var(--surface-card)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/exatta-mark.svg",
    alt: "Exatta",
    style: {
      height: 30,
      width: 'auto',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-extra) var(--text-md)/1 var(--font-display)',
      color: 'var(--text-strong)',
      letterSpacing: '-0.03em'
    }
  }, "exatta")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-bold) var(--text-2xs)/1 var(--font-body)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-subtle)',
      marginBottom: 8
    }
  }, "Configura\xE7\xE3o inicial"), /*#__PURE__*/React.createElement(Progress, {
    value: step / (STEPS.length - 1) * 100,
    tone: "brand"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, STEPS.map(s => {
    const state = s.id < step ? 'done' : s.id === step ? 'active' : 'todo';
    return /*#__PURE__*/React.createElement("div", {
      key: s.id,
      style: {
        display: 'flex',
        gap: 12,
        padding: '10px 8px',
        borderRadius: 'var(--radius-md)',
        background: state === 'active' ? 'var(--brand-subtle)' : 'transparent'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: '0 0 auto',
        width: 26,
        height: 26,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: state === 'done' ? 'var(--positive-500)' : state === 'active' ? 'var(--brand)' : 'var(--surface-sunken)',
        color: state === 'todo' ? 'var(--text-subtle)' : '#fff',
        font: 'var(--fw-bold) 12px/1 var(--font-mono)'
      }
    }, state === 'done' ? Icons.check({
      size: 14
    }) : s.id + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        font: `var(--fw-${state === 'active' ? 'bold' : 'semibold'}) var(--text-sm)/1.3 var(--font-body)`,
        color: state === 'todo' ? 'var(--text-muted)' : 'var(--text-strong)'
      }
    }, s.label), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-xs)/1.3 var(--font-body)',
        color: 'var(--text-subtle)'
      }
    }, s.desc)));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      font: 'var(--text-xs)/1.4 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brand)'
    }
  }, Icons.message({
    size: 18
  })), "Precisa de ajuda? Fale com um contador de verdade no WhatsApp."));
}
function StepCompany() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Raz\xE3o social",
    defaultValue: "Padaria Real LTDA",
    required: true
  })), /*#__PURE__*/React.createElement(Input, {
    label: "CNPJ",
    mono: true,
    defaultValue: "12.345.678/0001-90",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Nome fantasia",
    defaultValue: "Padaria Real"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "E-mail de contato",
    defaultValue: "joao@padariareal.com.br",
    prefix: Icons.message({
      size: 15
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Telefone / WhatsApp",
    mono: true,
    defaultValue: "(11) 98888-7777"
  }));
}
function StepRegime({
  regime,
  setRegime
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      maxWidth: 460
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Atividade principal",
    value: "Com\xE9rcio varejista de alimentos",
    onChange: () => {},
    options: ['Comércio varejista de alimentos', 'Prestação de serviços', 'Indústria', 'E-commerce']
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-body)',
      marginBottom: 10
    }
  }, "Regime tribut\xE1rio"), /*#__PURE__*/React.createElement(Radio, {
    value: regime,
    onChange: setRegime,
    options: [{
      value: 'simples',
      label: 'Simples Nacional',
      description: 'Recomendado para o seu faturamento atual'
    }, {
      value: 'presumido',
      label: 'Lucro Presumido',
      description: 'Para faturamentos acima de R$ 4,8 mi/ano'
    }, {
      value: 'real',
      label: 'Lucro Real',
      description: 'Apuração sobre o lucro efetivo'
    }]
  })));
}
function StepDocs() {
  const docs = [{
    name: 'Contrato social',
    status: ['positive', 'Enviado']
  }, {
    name: 'Cartão CNPJ',
    status: ['positive', 'Enviado']
  }, {
    name: 'Último balancete',
    status: ['warning', 'Pendente']
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      maxWidth: 520
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1.5px dashed var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-8)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--brand-subtle)',
      color: 'var(--brand)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, Icons.upload({
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-semibold) var(--text-sm)/1.3 var(--font-body)',
      color: 'var(--text-strong)'
    }
  }, "Arraste seus arquivos ou ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-link)'
    }
  }, "procure no computador")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--text-xs)/1.3 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, "PDF, JPG ou PNG \xB7 at\xE9 20 MB cada")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, docs.map(d => /*#__PURE__*/React.createElement(Card, {
    key: d.name,
    padding: "sm",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, Icons.file({
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--fw-medium) var(--text-sm)/1 var(--font-body)',
      color: 'var(--text-strong)'
    }
  }, d.name), /*#__PURE__*/React.createElement(Badge, {
    tone: d.status[0],
    dot: true
  }, d.status[1])))));
}
function StepDone() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      placeItems: 'center',
      minHeight: 360
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 420,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 72,
      height: 72,
      borderRadius: '50%',
      background: 'var(--positive-50)',
      color: 'var(--positive-500)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, Icons.check({
    size: 34,
    stroke: 2.5
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--type-h1)',
      color: 'var(--text-strong)'
    }
  }, "Cadastro conclu\xEDdo!"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--text-md)/1.6 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, "Sua contabilidade j\xE1 est\xE1 com tudo em m\xE3os. Um contador vai revisar seus dados e falar com voc\xEA em breve."), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: Icons.chevronR({
      size: 17
    })
  }, "Ir para o portal")));
}
function OnboardingWizard({
  onExit
}) {
  const [step, setStep] = React.useState(0);
  const [regime, setRegime] = React.useState('simples');
  const last = STEPS.length - 1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(Rail, {
    step: step
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: 'var(--space-12) var(--space-16)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640
    }
  }, step < last && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-bold) var(--text-2xs)/1 var(--font-body)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--brand)',
      marginBottom: 8
    }
  }, "Passo ", step + 1, " de ", STEPS.length), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--type-h1)',
      color: 'var(--text-strong)'
    }
  }, STEPS[step].label)), step === 0 && /*#__PURE__*/React.createElement(StepCompany, null), step === 1 && /*#__PURE__*/React.createElement(StepRegime, {
    regime: regime,
    setRegime: setRegime
  }), step === 2 && /*#__PURE__*/React.createElement(StepDocs, null), step === 3 && /*#__PURE__*/React.createElement(StepDone, null))), step < last && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: 'var(--space-5) var(--space-16)',
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => step === 0 ? onExit() : setStep(step - 1)
  }, step === 0 ? 'Sair' : 'Voltar'), /*#__PURE__*/React.createElement(Button, {
    onClick: () => setStep(step + 1),
    iconRight: Icons.chevronR({
      size: 16
    })
  }, step === last - 1 ? 'Concluir' : 'Continuar'))));
}
window.OnboardingWizard = OnboardingWizard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/onboarding/OnboardingWizard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/ClientesView.jsx
try { (() => {
const React = window.React;
const {
  Card,
  StatCard,
  Badge,
  Button,
  IconButton,
  Input,
  Tag
} = window.ExattaDesignSystem_128d5b;
const {
  Icons
} = window;

// Letter chip used by regime KPIs (LP / SN / LR) in place of an icon.
const Letters = ({
  text,
  color
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    font: 'var(--fw-extra) 13px/1 var(--font-display)',
    color,
    letterSpacing: '-0.02em'
  }
}, text);
const KPIS = [{
  value: 278,
  label: 'Total',
  tone: 'default',
  icon: Icons.building({
    size: 18
  })
}, {
  value: 261,
  label: 'Ativos',
  tone: 'credit',
  icon: Icons.checkCircle({
    size: 18
  }),
  colorValue: true
}, {
  value: 17,
  label: 'Inativos',
  tone: 'neutral',
  icon: Icons.xCircle({
    size: 18
  })
}, {
  value: 41,
  label: 'Presumido',
  tone: 'pending',
  icon: /*#__PURE__*/React.createElement(Letters, {
    text: "LP",
    color: "var(--pending)"
  }),
  colorValue: true
}, {
  value: 171,
  label: 'Simples',
  tone: 'info',
  icon: /*#__PURE__*/React.createElement(Letters, {
    text: "SN",
    color: "var(--info-500)"
  }),
  colorValue: true
}, {
  value: 24,
  label: 'MEI',
  tone: 'default',
  icon: Icons.users({
    size: 18
  }),
  colorValue: true
}, {
  value: 16,
  label: 'Lucro Real',
  tone: 'debit',
  icon: /*#__PURE__*/React.createElement(Letters, {
    text: "LR",
    color: "var(--debit)"
  }),
  colorValue: true
}];
const CLIENTS = [{
  name: 'A2F CONSORCIO LTDA',
  cnpj: '65.731.745/0001-76',
  status: [['positive', 'Normal'], ['brand', 'Onboarding']],
  since: '24/06/2026',
  prio: ['neutral', 'Sem dados'],
  regime: 'Simples Nacional',
  loc: 'Imperatriz - MA'
}, {
  name: 'PADARIA REAL LTDA',
  cnpj: '12.345.678/0001-90',
  status: [['positive', 'Normal']],
  since: '03/02/2024',
  prio: ['warning', 'Alta'],
  regime: 'Simples Nacional',
  loc: 'São Paulo - SP'
}, {
  name: 'CLINICA VIDA E SAUDE ME',
  cnpj: '88.402.113/0001-05',
  status: [['positive', 'Normal']],
  since: '17/09/2023',
  prio: ['info', 'Média'],
  regime: 'Lucro Presumido',
  loc: 'Belo Horizonte - MG'
}, {
  name: 'TECHNOVA SOLUCOES LTDA',
  cnpj: '31.559.028/0001-44',
  status: [['warning', 'Pendente']],
  since: '11/11/2025',
  prio: ['warning', 'Alta'],
  regime: 'Lucro Real',
  loc: 'Curitiba - PR'
}, {
  name: 'MERCADO BOM PRECO EIRELI',
  cnpj: '09.887.654/0001-31',
  status: [['positive', 'Normal']],
  since: '28/05/2022',
  prio: ['neutral', 'Baixa'],
  regime: 'Simples Nacional',
  loc: 'Fortaleza - CE'
}, {
  name: 'JM REPRESENTACOES MEI',
  cnpj: '44.201.776/0001-18',
  status: [['negative', 'Inativo']],
  since: '02/01/2021',
  prio: ['neutral', 'Sem dados'],
  regime: 'MEI',
  loc: 'Recife - PE'
}];
const COLS = '2.2fr 1.5fr 1.4fr 1fr 0.9fr 1.2fr 1.1fr 40px';
function SegTab({
  label,
  count,
  active,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '9px 14px',
      border: 'none',
      cursor: 'pointer',
      borderRadius: 'var(--radius-md)',
      background: active ? 'var(--brand)' : 'transparent',
      color: active ? '#fff' : 'var(--text-muted)',
      font: 'var(--fw-semibold) var(--text-sm)/1 var(--font-body)',
      boxShadow: active ? 'var(--shadow-brand)' : 'none',
      transition: 'all var(--dur-fast) var(--ease-out)'
    }
  }, active ? Icons.refresh({
    size: 15
  }) : Icons.users({
    size: 15
  }), label, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-bold) var(--text-2xs)/1 var(--font-body)',
      padding: '3px 7px',
      borderRadius: 'var(--radius-pill)',
      background: active ? 'rgba(255,255,255,0.22)' : 'var(--surface-sunken)',
      color: active ? '#fff' : 'var(--text-muted)'
    }
  }, count));
}
function ClientesView() {
  const [tab, setTab] = React.useState('rec');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      maxWidth: 1280,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      background: 'linear-gradient(120deg, var(--surface-card) 60%, var(--brand-subtle))',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--brand-subtle-2)',
      color: 'var(--brand)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, Icons.building({
    size: 22
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--type-h1)',
      color: 'var(--text-strong)'
    }
  }, "Clientes"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      font: 'var(--text-sm)/1.4 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, "Gerencie o cadastro de empresas e clientes")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    iconLeft: Icons.chevronD({
      size: 15
    })
  }, "Mais a\xE7\xF5es"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    iconLeft: Icons.download({
      size: 15
    })
  }, "Exportar"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    iconLeft: Icons.plus({
      size: 15
    })
  }, "Nova Empresa"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(SegTab, {
    label: "Recorrentes",
    count: 278,
    active: tab === 'rec',
    onClick: () => setTab('rec')
  }), /*#__PURE__*/React.createElement(SegTab, {
    label: "N\xE3o recorrentes",
    count: 6,
    active: tab === 'nrec',
    onClick: () => setTab('nrec')
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: 12
    }
  }, KPIS.map(k => /*#__PURE__*/React.createElement(StatCard, {
    key: k.label,
    compact: true,
    value: k.value,
    label: k.label,
    tone: k.tone,
    icon: k.icon,
    colorValue: k.colorValue,
    unit: ""
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "sm",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Buscar por raz\xE3o social, CNPJ ou nome fantasia\u2026",
    prefix: Icons.search({
      size: 17
    })
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: Icons.filter({
      size: 16
    })
  }, "Filtros")), /*#__PURE__*/React.createElement(Card, {
    padding: "sm",
    elevation: "sm"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: COLS,
      gap: 12,
      padding: '10px 14px',
      font: 'var(--fw-semibold) var(--text-2xs)/1 var(--font-body)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Empresa"), /*#__PURE__*/React.createElement("span", null, "CNPJ"), /*#__PURE__*/React.createElement("span", null, "Status"), /*#__PURE__*/React.createElement("span", null, "Cliente Desde"), /*#__PURE__*/React.createElement("span", null, "Prioridade"), /*#__PURE__*/React.createElement("span", null, "Regime"), /*#__PURE__*/React.createElement("span", null, "Localiza\xE7\xE3o"), /*#__PURE__*/React.createElement("span", null)), CLIENTS.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c.cnpj,
    style: {
      display: 'grid',
      gridTemplateColumns: COLS,
      gap: 12,
      alignItems: 'center',
      padding: '14px',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-bold) var(--text-sm)/1.3 var(--font-body)',
      color: 'var(--text-strong)'
    }
  }, c.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-medium) var(--text-sm)/1 var(--font-mono)',
      color: 'var(--text-body)',
      background: 'var(--surface-sunken)',
      padding: '4px 8px',
      borderRadius: 'var(--radius-sm)',
      justifySelf: 'start'
    }
  }, c.cnpj), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 5,
      flexWrap: 'wrap'
    }
  }, c.status.map(s => /*#__PURE__*/React.createElement(Badge, {
    key: s[1],
    tone: s[0],
    size: "sm"
  }, s[1]))), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-sm)/1 var(--font-mono)',
      color: 'var(--text-muted)'
    }
  }, c.since), /*#__PURE__*/React.createElement(Badge, {
    tone: c.prio[0],
    size: "sm"
  }, c.prio[1]), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-sm)/1 var(--font-body)',
      color: 'var(--text-body)'
    }
  }, c.regime), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      font: 'var(--text-sm)/1 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, Icons.pin({
    size: 14
  }), c.loc), /*#__PURE__*/React.createElement(IconButton, {
    label: "A\xE7\xF5es",
    variant: "ghost",
    size: "sm"
  }, Icons.dots({
    size: 18
  }))))));
}
window.ClientesView = ClientesView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/ClientesView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/Icons.jsx
try { (() => {
// Exatta UI-kit icon set — Lucide-style 24px stroke glyphs (1.75 weight).
// Local to the kits so screens don't depend on a CDN at render time.
const React = window.React;
function I(paths, props = {}) {
  const {
    size = 20,
    stroke = 2,
    ...rest
  } = props;
  return React.createElement('svg', {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    ...rest
  }, paths.map((d, i) => React.createElement('path', {
    key: i,
    d
  })));
}
const Icons = {
  home: p => I(['M3 10.5 12 3l9 7.5', 'M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5'], p),
  file: p => I(['M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z', 'M14 3v5h5'], p),
  receipt: p => I(['M5 3v18l2-1 2 1 2-1 2 1 2-1 2 1V3l-2 1-2-1-2 1-2-1-2 1z', 'M9 8h6', 'M9 12h6'], p),
  chart: p => I(['M3 3v18h18', 'M7 15l3-4 3 2 4-6'], p),
  wallet: p => I(['M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v3', 'M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-3', 'M18 12h3v4h-3a2 2 0 0 1 0-4z'], p),
  bell: p => I(['M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9', 'M13.7 21a2 2 0 0 1-3.4 0'], p),
  settings: p => I(['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 7 2.6 1.6 1.6 0 0 0 8 1.1V1a2 2 0 1 1 4 0v.1A1.6 1.6 0 0 0 15 2.6a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V7a1.6 1.6 0 0 0 1.1 1.5H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z'], p),
  search: p => I(['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'm21 21-4.3-4.3'], p),
  download: p => I(['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'], p),
  upload: p => I(['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'], p),
  plus: p => I(['M12 5v14', 'M5 12h14'], p),
  check: p => I(['M20 6 9 17l-5-5'], p),
  chevronR: p => I(['m9 6 6 6-6 6'], p),
  calendar: p => I(['M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M3 9h18', 'M8 3v4', 'M16 3v4'], p),
  logout: p => I(['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'm16 17 5-5-5-5', 'M21 12H9'], p),
  message: p => I(['M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'], p),
  building: p => I(['M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16', 'M16 8h2a2 2 0 0 1 2 2v11', 'M2 21h20', 'M8 7h2', 'M8 11h2', 'M8 15h2'], p),
  shield: p => I(['M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z', 'm9 12 2 2 4-4'], p),
  clock: p => I(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 7v5l3 2'], p),
  chevronD: p => I(['m6 9 6 6 6-6'], p),
  whatsapp: p => I(['M12 21a9 9 0 1 0-8-4.7L3 21l4.9-1a9 9 0 0 0 4.1 1z', 'M8.5 9.5c0 4 3 6.5 6 6.5.7 0 1.3-.6 1.3-1.1 0-.3-.2-.6-.5-.8l-1.4-.7a.7.7 0 0 0-.8.1l-.4.4a4.4 4.4 0 0 1-1.8-1.8l.4-.4a.7.7 0 0 0 .1-.8l-.7-1.4c-.2-.3-.5-.5-.8-.5-.5 0-1.1.6-1.1 1.3z'], p),
  sparkles: p => I(['M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z', 'M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z'], p),
  moon: p => I(['M21 12.8A8 8 0 1 1 11.2 3 6 6 0 0 0 21 12.8z'], p),
  grid: p => I(['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M14 14h6v6h-6z'], p),
  filter: p => I(['M3 5h18l-7 8v6l-4 2v-8z'], p),
  sort: p => I(['M8 4v16', 'm4 8 4-4 4 4', 'M16 20V4', 'm20 16-4 4-4-4'], p),
  dots: p => I(['M12 6h.01', 'M12 12h.01', 'M12 18h.01'], p),
  checkCircle: p => I(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'm8.5 12 2.5 2.5 4.5-5'], p),
  xCircle: p => I(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'm15 9-6 6', 'm9 9 6 6'], p),
  users: p => I(['M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1', 'M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', 'M21 20v-1a4 4 0 0 0-3-3.9', 'M15 4.1a4 4 0 0 1 0 7.8'], p),
  briefcase: p => I(['M4 8h16a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a1 1 0 0 1 1-1z', 'M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2'], p),
  refresh: p => I(['M21 12a9 9 0 1 1-3-6.7L21 8', 'M21 3v5h-5'], p),
  pin: p => I(['M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z', 'M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'], p)
};
window.Icons = Icons;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/TaxesView.jsx
try { (() => {
const React = window.React;
const {
  Card,
  Badge,
  Button,
  StatCard,
  Progress
} = window.ExattaDesignSystem_128d5b;
const {
  Icons
} = window;
const guias = [{
  name: 'DAS — Simples Nacional',
  comp: '06/2025',
  due: '20/06',
  value: '1.284,30',
  status: ['warning', 'Vence em 3 dias']
}, {
  name: 'FGTS',
  comp: '05/2025',
  due: '07/06',
  value: '842,10',
  status: ['positive', 'Pago']
}, {
  name: 'INSS — Pró-labore',
  comp: '05/2025',
  due: '15/06',
  value: '495,00',
  status: ['positive', 'Pago']
}, {
  name: 'DCTFWeb',
  comp: '06/2025',
  due: '15/06',
  value: '—',
  status: ['brand', 'Em análise']
}, {
  name: 'IRPJ',
  comp: '2º Tri',
  due: '31/07',
  value: '3.120,00',
  status: ['neutral', 'Programado']
}];
function TaxesView() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)',
      maxWidth: 1080
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Total a pagar (jun)",
    value: "2.126,40",
    icon: Icons.receipt({
      size: 16
    }),
    tone: "pending"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Pago no m\xEAs",
    value: "1.337,10",
    icon: Icons.check({
      size: 16
    }),
    tone: "credit"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Economia c/ planejamento",
    value: "18.4%",
    unit: "",
    icon: Icons.shield({
      size: 16
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--type-h3)',
      color: 'var(--text-strong)'
    }
  }, "Guias e impostos"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    iconLeft: Icons.download({
      size: 15
    })
  }, "Exportar")), /*#__PURE__*/React.createElement(Card, {
    padding: "sm",
    elevation: "sm"
  }, guias.map((g, i) => /*#__PURE__*/React.createElement("div", {
    key: g.name,
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 0.8fr 0.8fr 1fr 1.1fr 100px',
      gap: 12,
      alignItems: 'center',
      padding: '15px 12px',
      borderTop: i ? '1px solid var(--border-subtle)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) var(--text-sm)/1.3 var(--font-body)',
      color: 'var(--text-strong)'
    }
  }, g.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-xs)/1 var(--font-mono)',
      color: 'var(--text-muted)'
    }
  }, g.comp), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-xs)/1 var(--font-mono)',
      color: 'var(--text-muted)'
    }
  }, "Vence ", g.due), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-bold) var(--text-sm)/1 var(--font-mono)',
      color: 'var(--text-strong)'
    }
  }, g.value !== '—' ? `R$ ${g.value}` : '—'), /*#__PURE__*/React.createElement(Badge, {
    tone: g.status[0],
    dot: true
  }, g.status[1]), /*#__PURE__*/React.createElement(Button, {
    variant: g.status[1] === 'Pago' ? 'ghost' : 'primary',
    size: "sm"
  }, g.status[1] === 'Pago' ? 'Comprovante' : 'Pagar'))))));
}
window.TaxesView = TaxesView;
function PlaceholderView({
  view
}) {
  const map = {
    reports: {
      icon: Icons.chart({
        size: 26
      }),
      title: 'Relatórios',
      text: 'Balanço, DRE e balancetes atualizados mensalmente pela sua contabilidade.'
    },
    finance: {
      icon: Icons.wallet({
        size: 26
      }),
      title: 'Financeiro',
      text: 'Contas a pagar/receber, conciliação bancária e fluxo de caixa em um só lugar.'
    }
  };
  const m = map[view] || map.reports;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      placeItems: 'center',
      minHeight: 420
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      maxWidth: 420,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      alignItems: 'center',
      padding: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 'var(--radius-xl)',
      background: 'var(--brand-subtle)',
      color: 'var(--brand)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, m.icon), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--type-h2)',
      color: 'var(--text-strong)'
    }
  }, m.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--text-sm)/1.6 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, m.text), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "Falar com meu contador")));
}
window.PlaceholderView = PlaceholderView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/TaxesView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/TopNav.jsx
try { (() => {
const React = window.React;
const {
  Avatar,
  Badge,
  IconButton,
  NotificationPanel
} = window.ExattaDesignSystem_128d5b;
const {
  Icons
} = window;
const NOTIFS = [{
  id: 1,
  tone: 'warning',
  icon: 'receipt',
  unread: true,
  title: 'DAS vence em 3 dias',
  description: 'Guia de R$ 1.284,30 disponível para pagamento.',
  time: 'há 2 horas'
}, {
  id: 2,
  tone: 'positive',
  icon: 'checkCircle',
  unread: true,
  title: 'Folha processada',
  description: 'Competência 05/2025 concluída.',
  time: 'há 5 horas'
}, {
  id: 3,
  tone: 'brand',
  icon: 'message',
  unread: true,
  title: 'Nova mensagem do contador',
  description: 'João: "Enviei o balancete de maio."',
  time: 'ontem'
}, {
  id: 4,
  tone: 'highlight',
  icon: 'sparkles',
  title: 'Novo: relatórios de DRE',
  description: 'Acompanhe sua DRE em tempo real.',
  time: '2 dias'
}, {
  id: 5,
  tone: 'info',
  icon: 'file',
  title: 'NF-e 2024.045 processada',
  description: 'Documento conciliado.',
  time: '3 dias'
}];
const NAV = [{
  id: 'backoffice',
  label: 'Backoffice'
}, {
  id: 'contabil',
  label: 'Contábil'
}, {
  id: 'fiscal',
  label: 'Fiscal'
}, {
  id: 'rh',
  label: 'RH'
}, {
  id: 'ferramentas',
  label: 'Ferramentas'
}];
function NavLink({
  label,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '8px 12px',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      borderRadius: 'var(--radius-sm)',
      font: `var(--fw-${active ? 'bold' : 'semibold'}) var(--text-sm)/1 var(--font-body)`,
      color: active ? 'var(--brand)' : hover ? 'var(--text-strong)' : 'var(--text-body)',
      transition: 'color var(--dur-fast) var(--ease-out)'
    }
  }, label, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-subtle)',
      display: 'inline-flex'
    }
  }, Icons.chevronD({
    size: 14
  })));
}
function TopNav({
  nav,
  setNav
}) {
  const [notifOpen, setNotifOpen] = React.useState(false);
  const unread = NOTIFS.filter(n => n.unread).length;
  const utilIcons = [{
    key: 'chat',
    el: Icons.message({
      size: 19
    })
  }, {
    key: 'whats',
    el: Icons.whatsapp({
      size: 19
    })
  }, {
    key: 'spark',
    el: /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--teal-500)',
        display: 'inline-flex'
      }
    }, Icons.sparkles({
      size: 19
    }))
  }, {
    key: 'msg',
    el: Icons.chat ? Icons.chat({
      size: 19
    }) : Icons.message({
      size: 19
    })
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 64,
      flex: '0 0 64px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 var(--space-8)',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginRight: 20
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/exatta-mark.svg",
    alt: "Exatta",
    style: {
      height: 30,
      width: 'auto',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-extra) var(--text-md)/1 var(--font-display)',
      color: 'var(--text-strong)',
      letterSpacing: '-0.03em'
    }
  }, "exatta"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-medium) 9px/1 var(--font-body)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-subtle)',
      marginTop: 2
    }
  }, "contabilidade"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2
    }
  }, NAV.map(n => /*#__PURE__*/React.createElement(NavLink, {
    key: n.id,
    label: n.label,
    active: nav === n.id,
    onClick: () => setNav(n.id)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 2
    }
  }, utilIcons.map(u => /*#__PURE__*/React.createElement(IconButton, {
    key: u.key,
    label: u.key,
    variant: "ghost"
  }, u.el)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Agenda",
    variant: "ghost"
  }, Icons.calendar({
    size: 19
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      right: 2,
      minWidth: 16,
      height: 16,
      padding: '0 4px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--brand)',
      color: '#fff',
      font: 'var(--fw-bold) 9px/16px var(--font-body)',
      textAlign: 'center',
      border: '1.5px solid var(--surface-card)'
    }
  }, "52")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Notifica\xE7\xF5es",
    variant: notifOpen ? 'secondary' : 'ghost',
    onClick: () => setNotifOpen(o => !o)
  }, Icons.bell({
    size: 19
  })), unread > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 6,
      right: 7,
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--brand)',
      border: '1.5px solid var(--surface-card)'
    }
  }), notifOpen && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: () => setNotifOpen(false),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 40
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 10px)',
      right: 0,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement(NotificationPanel, {
    items: NOTIFS,
    onFooterClick: () => setNotifOpen(false)
  })))), /*#__PURE__*/React.createElement(IconButton, {
    label: "Tema",
    variant: "ghost"
  }, Icons.moon({
    size: 19
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 26,
      background: 'var(--border-subtle)',
      margin: '0 6px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Romario Oliveira",
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--fw-semibold) var(--text-sm)/1 var(--font-body)',
      color: 'var(--text-strong)'
    }
  }, "Romario"))));
}
window.TopNav = TopNav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/TopNav.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.GLYPHS = __ds_scope.GLYPHS;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Progress = __ds_scope.Progress;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Notification = __ds_scope.Notification;

__ds_ns.NotificationPanel = __ds_scope.NotificationPanel;

})();
