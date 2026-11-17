import { useId } from 'react';

export type CumbiState = 'Base' | 'Curioso' | 'Leyendo' | 'Explorando' | 'Celebrando';
export type CumbiLevel = 1 | 2 | 3 | 4 | 5;

/** Shared flat artwork: the app, exported assets and model sheet use these same paths. */
export function CumbiArtwork({
  state = 'Base',
  level = 1,
  silhouette = false,
}: {
  state?: CumbiState;
  level?: CumbiLevel;
  silhouette?: boolean;
}) {
  const id = useId().replace(/:/g, '');
  const amber = silhouette ? '#22313A' : '#F2AA2E';
  const ember = silhouette ? '#22313A' : '#F35524';
  const teal = silhouette ? '#22313A' : '#3B8078';
  const curious = state === 'Curioso';
  const reading = state === 'Leyendo';
  const celebrating = state === 'Celebrando';
  const exploring = state === 'Explorando';
  const leftEye = 'M77 107 L111 101 Q124 100 128 114 L129 124 Q125 138 106 141 Q83 145 78 133 Q74 120 77 107Z';
  const rightEye = 'M138 97 L173 91 Q187 90 191 105 L193 116 Q189 131 170 135 Q147 140 140 127 Q135 114 138 97Z';

  return (
    <g transform={celebrating ? 'translate(0 -7)' : undefined} clipPath={curious ? 'url(#' + id + '-thoughtful-hand)' : undefined}>
      {curious && (
        <defs>
          <clipPath id={id + '-thoughtful-hand'}>
            <path
              d="M0 0H240V240H0Z M212 164Q195 161 181 154Q174 150 174 145L171 144Q170 152 179 157Q195 165 211 167Z"
              clipRule="evenodd"
            />
          </clipPath>
        </defs>
      )}
      {/* Backpack remains visible behind the viewer-left flank in every pose. */}
      <path d="M52 113 Q40 111 25 123 Q18 129 20 143 L26 190 Q27 205 43 205 L65 202 70 125Z" fill={ember} />
      {level >= 3 && (
        <g fill="#22313A">
          <path d="m31 106 5 1-9 104-5-1Z" />
          <path d="M9 109Q27 88 47 96L47 101Q28 99 12 114Z" />
        </g>
      )}
      {level >= 4 && (
        <path
          d="M31 156C12 156 12 191 29 193C47 194 48 158 31 156ZM30 162C41 163 39 187 29 187C20 185 20 161 30 162ZM30 167C24 167 23 181 29 183C35 182 37 170 30 167Z"
          fill={silhouette ? '#22313A' : '#F7F4EC'}
          fillRule="evenodd"
        />
      )}
      {/* Low, rounded hips and a short, soft inverted-V foot cleft. No outline. */}
      <path
        d={
          exploring
            ? 'M61 216Q43 216 42 195L36 157Q35 136 43 117L83 32Q92 11 106 24L136 63Q141 70 154 65C174 61 184 74 191 94L210 139Q217 153 212 174L208 187Q211 190 221 192Q229 196 222 204L201 219Q190 225 180 213L158 189Q152 183 146 190L132 209Q126 216 110 216Z'
            : 'M61 216Q43 216 42 195L36 157Q35 136 43 117L83 32Q92 11 106 24L136 63Q141 70 154 65C174 61 184 74 191 94L210 139Q217 153 212 174L208 202Q207 216 191 216L171 216Q160 216 155 205L145 187Q141 181 137 189L126 207Q121 216 109 216Z'
        }
        fill={amber}
      />
      {/* Rounded hands grow from the silhouette rather than thin jointed arms. */}
      <path
        d={
          celebrating
            ? 'M61 146Q41 143 25 123L11 105Q3 90 16 84Q25 80 34 92L65 116Z'
            : curious
              ? 'M52 145Q37 145 33 164Q30 177 40 181Q51 184 58 172L68 155Z'
              : reading
                ? 'M52 143Q39 147 42 165L54 182Q65 187 70 176L65 154Z'
                : 'M52 142Q40 143 35 158L31 175Q29 190 42 192Q51 194 59 181L70 158Z'
        }
        fill={amber}
      />
      <path
        d={
          celebrating
            ? 'M190 126Q201 113 214 94Q223 81 234 90Q242 98 234 110Q218 138 201 151Z'
            : curious
              ? 'M181 155Q200 169 217 177Q230 181 234 168Q238 155 224 151L189 136Q174 129 167 140Q162 150 175 155Z'
              : reading
                ? 'M194 143Q208 145 211 158Q213 172 199 180L186 176 180 157Z'
                : 'M188 130Q204 124 218 107Q228 96 237 106Q241 115 236 128Q216 154 196 161L179 154Z'
        }
        fill={amber}
      />
      {level >= 2 && <path d="M69 159Q137 175 200 150L201 165Q139 190 72 175L65 194 51 188 57 165Z" fill={teal} />}
      {!silhouette && (
        <g transform={curious ? 'rotate(-7 135 125)' : undefined}>
          {celebrating ? (
            <g fill="#22313A">
              <path d="M78 122Q90 98 108 113Q114 117 109 122Q106 125 102 120Q91 110 85 124Q81 129 78 122Z" />
              <path d="M142 111Q156 88 173 102Q179 107 174 112Q171 114 167 109Q155 101 149 114Q145 118 142 111Z" />
            </g>
          ) : (
            <>
              <defs>
                <clipPath id={id + '-left'}>
                  <path d={leftEye} />
                </clipPath>
                <clipPath id={id + '-right'}>
                  <path d={rightEye} />
                </clipPath>
              </defs>
              <path d={leftEye} fill="#FFFFFF" />
              <path d={rightEye} fill="#FFFFFF" />
              <g clipPath={'url(#' + id + '-left)'}>
                <ellipse cx={reading ? 112 : 118} cy={reading ? 127 : 118} rx="12" ry="18" fill="#22313A" />
              </g>
              <g clipPath={'url(#' + id + '-right)'}>
                <ellipse cx={reading ? 175 : 182} cy={reading ? 119 : 108} rx="12" ry="18" fill="#22313A" />
              </g>
            </>
          )}
          <path
            d="M125 144Q128 140 132 145Q139 151 145 141Q148 137 151 141Q154 145 148 151Q138 161 127 151Q122 148 125 144Z"
            fill="#22313A"
            transform={celebrating ? undefined : 'translate(139 148) scale(.8) translate(-139 -148)'}
          />
        </g>
      )}
      {reading && (
        <g>
          <path d="M81 159Q108 153 136 169Q160 152 190 153L188 193Q160 195 137 211Q112 196 83 199Z" fill={teal} />
          <path
            d="M83 156Q108 151 136 165Q162 149 189 150L189 156Q160 156 137 173Q111 159 83 163Z"
            fill={silhouette ? '#F7F4EC' : '#FFFFFF'}
          />
          <path d="M136 173L140 173 139 208 136 210Z" fill={silhouette ? '#22313A' : '#22313A'} />
          <path
            d="M82 171Q94 170 95 182Q96 194 82 195Q70 194 71 183Q71 173 82 171ZM190 166Q202 163 206 175Q209 186 197 191Q184 195 181 183Q178 171 190 166Z"
            fill={amber}
          />
        </g>
      )}
      {level >= 5 && (
        <g>
          <path d="M171 14H175V77H171Z" fill="#22313A" />
          <path d="M175 14L211 24 175 36Z" fill={teal} />
        </g>
      )}
      {curious && !silhouette && (
        <path
          d="M186 36Q186 25 198 26Q210 27 209 37Q209 43 202 47L201 53H195L195 44Q204 39 202 34Q198 29 193 36ZM194 58H201V65H194Z"
          fill="#F2AA2E"
        />
      )}
      {celebrating && !silhouette && (
        <g fill="#F2AA2E">
          <path d="m28 66-9-18 5-3 9 19ZM37 61l-2-20 6-1 2 20ZM209 63l9-19 6 3-10 19ZM220 73l18-9 3 5-18 10Z" />
        </g>
      )}
    </g>
  );
}
