{
  "root": ".",
  "filesScanned": 78,
  "findings": {
    "M2": {
      "rule": "transition-all (transition specific properties instead)",
      "count": 39,
      "samples": [
        "app\\(auth)\\login\\page.tsx:83  className=\"w-full pl-10 pr-4 py-2.5 bg-obsidian border border-white/10 rounded-xl text-sm ",
        "app\\(auth)\\login\\page.tsx:112  className=\"w-full pl-10 pr-4 py-2.5 bg-obsidian border border-white/10 rounded-xl text-sm ",
        "app\\(auth)\\login\\page.tsx:120  className=\"w-full mt-2 py-3 px-4 rounded-xl bg-rose text-obsidian font-medium text-sm hove",
        "app\\(auth)\\signup\\page.tsx:90  className=\"w-full pl-10 pr-4 py-2.5 bg-obsidian border border-white/10 rounded-xl text-sm ",
        "app\\(auth)\\signup\\page.tsx:107  className=\"w-full pl-10 pr-4 py-2.5 bg-obsidian border border-white/10 rounded-xl text-sm "
      ]
    },
    "S1": {
      "rule": "arbitrary spacing off the 4px scale",
      "count": 3,
      "samples": [
        "components\\ui\\navigation-menu.tsx:58  top-[1px]",
        "components\\ui\\scroll-area.tsx:36  p-[1px]",
        "components\\ui\\scroll-area.tsx:38  p-[1px]"
      ]
    },
    "T1": {
      "rule": "font-weight sprawl: 4 weights in use (font-medium, font-semibold, font-bold, font-normal)",
      "count": 1,
      "samples": [
        ":0  font-medium font-semibold font-bold font-normal"
      ]
    },
    "M3": {
      "rule": "animations/transitions present but no motion-reduce / prefers-reduced-motion handling",
      "count": 1,
      "samples": [
        ":0  (project-wide)"
      ]
    }
  }
}
FAIL: 4 checklist item(s) flagged — M2, M3, S1, T1
