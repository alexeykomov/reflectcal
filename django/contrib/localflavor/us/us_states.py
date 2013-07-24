"""
A mapping of state misspellings/abbreviations to normalized abbreviations, and
an alphabetical list of states for use as `choices` in a formfield.

This exists in this standalone file so that it's only imported into memory
when explicitly needed.
"""

STATE_CHOICES = (
    ('AL', 'Alabama'),
    ('AK', 'Alaska'),
    ('AS', 'American Samoa'),
    ('AZ', 'Arizona'),
    ('AR', 'Arkansas'),
    ('CA', 'California'),
    ('CO', 'Colorado'),
    ('CT', 'Connecticut'),
    ('DE', 'Delaware'),
    ('DC', 'District of Columbia'),
    ('FL', 'Florida'),
    ('GA', 'Georgia'),
    ('GU', 'Guam'),
    ('HI', 'Hawaii'),
    ('ID', 'Idaho'),
    ('IL', 'Illinois'),
    ('IN', 'Indiana'),
    ('IA', 'Iowa'),
    ('KS', 'Kansas'),
    ('KY', 'Kentucky'),
    ('LA', 'Louisiana'),
    ('ME', 'Maine'),
    ('MD', 'Maryland'),
    ('MA', 'Massachusetts'),
    ('MI', 'Michigan'),
    ('MN', 'Minnesota'),
    ('MS', 'Mississippi'),
    ('MO', 'Missouri'),
    ('MT', 'Montana'),
    ('NE', 'Nebraska'),
    ('NV', 'Nevada'),
    ('NH', 'New Hampshire'),
    ('NJ', 'New Jersey'),
    ('NM', 'New Mexico'),
    ('NY', 'New York'),
    ('NC', 'North Carolina'),
    ('ND', 'North Dakota'),
    ('MP', 'Northern Mariana Islands'),
    ('OH', 'Ohio'),
    ('OK', 'Oklahoma'),
    ('OR', 'Oregon'),
    ('PA', 'Pennsylvania'),
    ('PR', 'Puerto Rico'),
    ('RI', 'Rhode Island'),
    ('SC', 'South Carolina'),
    ('SD', 'South Dakota'),
    ('TN', 'Tennessee'),
    ('TX', 'Texas'),
    ('UT', 'Utah'),
    ('VT', 'Vermont'),
    ('VI', 'Virgin Islands'),
    ('VA', 'Virginia'),
    ('WA', 'Washington'),
    ('WV', 'West Virginia'),
    ('WI', 'Wisconsin'),
    ('WY', 'Wyoming'),
)

STATES_NORMALIZED = {
    'ak': 'AK',
    'al': 'AL',
    'ala': 'AL',
    'alabama': 'AL',
    'alaska': 'AK',
    'american samao': 'AS',
    'american samoa': 'AS',
    'ar': 'AR',
    'ariz': 'AZ',
    'arizona': 'AZ',
    'ark': 'AR',
    'arkansas': 'AR',
    'as': 'AS',
    'az': 'AZ',
    'ca': 'CA',
    'calf': 'CA',
    'calif': 'CA',
    'california': 'CA',
    'co': 'CO',
    'colo': 'CO',
    'colorado': 'CO',
    'conn': 'CT',
    'connecticut': 'CT',
    'ct': 'CT',
    'dc': 'DC',
    'de': 'DE',
    'del': 'DE',
    'delaware': 'DE',
    'deleware': 'DE',
    'district of columbia': 'DC',
    'fl': 'FL',
    'fla': 'FL',
    'florida': 'FL',
    'ga': 'GA',
    'georgia': 'GA',
    'gu': 'GU',
    'guam': 'GU',
    'hawaii': 'HI',
    'hi': 'HI',
    'ia': 'IA',
    'id': 'ID',
    'idaho': 'ID',
    'il': 'IL',
    'ill': 'IL',
    'illinois': 'IL',
    'in': 'IN',
    'ind': 'IN',
    'indiana': 'IN',
    'iowa': 'IA',
    'kan': 'KS',
    'kans': 'KS',
    'kansas': 'KS',
    'kentucky': 'KY',
    'ks': 'KS',
    'ky': 'KY',
    'la': 'LA',
    'louisiana': 'LA',
    'ma': 'MA',
    'maine': 'ME',
    'marianas islands': 'MP',
    'marianas islands of the pacific': 'MP',
    'marinas islands of the pacific': 'MP',
    'maryland': 'MD',
    'mass': 'MA',
    'massachusetts': 'MA',
    'massachussetts': 'MA',
    'md': 'MD',
    'me': 'ME',
    'mi': 'MI',
    'mich': 'MI',
    'michigan': 'MI',
    'minn': 'MN',
    'minnesota': 'MN',
    'miss': 'MS',
    'mississippi': 'MS',
    'missouri': 'MO',
    'mn': 'MN',
    'mo': 'MO',
    'mont': 'MT',
    'montana': 'MT',
    'mp': 'MP',
    'ms': 'MS',
    'mt': 'MT',
    'n d': 'ND',
    'n dak': 'ND',
    'n h': 'NH',
    'n j': 'NJ',
    'n m': 'NM',
    'n mex': 'NM',
    'nc': 'NC',
    'nd': 'ND',
    'ne': 'NE',
    'neb': 'NE',
    'nebr': 'NE',
    'nebraska': 'NE',
    'nev': 'NV',
    'nevada': 'NV',
    'new hampshire': 'NH',
    'new jersey': 'NJ',
    'new mexico': 'NM',
    'new york': 'NY',
    'nh': 'NH',
    'nj': 'NJ',
    'nm': 'NM',
    'nmex': 'NM',
    'north carolina': 'NC',
    'north dakota': 'ND',
    'northern mariana islands': 'MP',
    'nv': 'NV',
    'ny': 'NY',
    'oh': 'OH',
    'ohio': 'OH',
    'ok': 'OK',
    'okla': 'OK',
    'oklahoma': 'OK',
    'or': 'OR',
    'ore': 'OR',
    'oreg': 'OR',
    'oregon': 'OR',
    'pa': 'PA',
    'penn': 'PA',
    'pennsylvania': 'PA',
    'pr': 'PR',
    'puerto rico': 'PR',
    'rhode island': 'RI',
    'ri': 'RI',
    's dak': 'SD',
    'sc': 'SC',
    'sd': 'SD',
    'sdak': 'SD',
    'south carolina': 'SC',
    'south dakota': 'SD',
    'tenn': 'TN',
    'tennessee': 'TN',
    'territory of hawaii': 'HI',
    'tex': 'TX',
    'texas': 'TX',
    'tn': 'TN',
    'tx': 'TX',
    'us virgin islands': 'VI',
    'usvi': 'VI',
    'ut': 'UT',
    'utah': 'UT',
    'va': 'VA',
    'vermont': 'VT',
    'vi': 'VI',
    'viginia': 'VA',
    'virgin islands': 'VI',
    'virgina': 'VA',
    'virginia': 'VA',
    'vt': 'VT',
    'w va': 'WV',
    'wa': 'WA',
    'wash': 'WA',
    'washington': 'WA',
    'west virginia': 'WV',
    'wi': 'WI',
    'wis': 'WI',
    'wisc': 'WI',
    'wisconsin': 'WI',
    'wv': 'WV',
    'wva': 'WV',
    'wy': 'WY',
    'wyo': 'WY',
    'wyoming': 'WY',
}
