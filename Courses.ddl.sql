-- See https://schema.org/Course and https://www.rfc-editor.org/rfc/rfc9073.html
-- Base table for all schema.org Things
CREATE TABLE Things (
    id SERIAL PRIMARY KEY,
    additionalType TEXT,
    alternateName VARCHAR(255),
    description TEXT,
    disambiguatingDescription TEXT,
    identifier TEXT,
    image TEXT, -- Could be a relation to an Images table
    mainEntityOfPage TEXT,
    name VARCHAR(255),
    potentialAction TEXT,
    sameAs TEXT,
    url TEXT
);

-- Base table for Creative Works, inheriting from Thing
CREATE TABLE CreativeWorks (
    thing_id INTEGER PRIMARY KEY REFERENCES Things(id),
    about TEXT,
    abstract TEXT,
    accessMode VARCHAR(100),
    accessModeSufficient VARCHAR(255),
    accessibilityAPI VARCHAR(100),
    accessibilityFeature VARCHAR(100),
    accessibilityHazard VARCHAR(100),
    accessibilitySummary TEXT,
    accountablePerson INTEGER REFERENCES Persons(id), -- Assuming Persons table exists
    alternativeHeadline VARCHAR(255),
    associatedMedia TEXT,
    audienceType VARCHAR(255),
    award VARCHAR(255),
    bitrate VARCHAR(255),
    character INTEGER REFERENCES Persons(id), -- Assuming Persons table exists
    citation TEXT,
    comment_id INTEGER REFERENCES Comments(id), -- Assuming Comments table exists
    commentCount INTEGER,
    contentLocation INTEGER REFERENCES Places(id), -- Assuming Places table exists
    contentRating VARCHAR(100),
    contentReferenceTime TIME,
    copyrightNotice TEXT,
    copyrightYear INTEGER,
    creator TEXT, -- Can be Person or Organization, consider separate link table
    dateCreated TIMESTAMP WITH TIME ZONE,
    dateModified TIMESTAMP WITH TIME ZONE,
    datePublished TIMESTAMP WITH TIME ZONE,
    discussionUrl TEXT,
    editor INTEGER REFERENCES Persons(id), -- Assuming Persons table exists
    encodingFormat VARCHAR(255),
    exampleOfWork TEXT,
    expires DATE,
    funder TEXT, -- Can be Person or Organization, consider separate link table
    genre VARCHAR(255),
    hasPart TEXT,
    headline VARCHAR(255),
    inLanguage VARCHAR(10),
    interactionStatistic TEXT,
    interactionType TEXT,
    isAccessibleForFree BOOLEAN,
    isBasedOn TEXT,
    isFamilyFriendly BOOLEAN,
    keywords TEXT,
    license TEXT,
    locationCreated INTEGER REFERENCES Places(id), -- Assuming Places table exists
    mainEntity TEXT,
    material TEXT,
    mentions TEXT,
    offers TEXT, -- Could be a relation to an Offers table
    position INTEGER,
    producer TEXT, -- Can be Person or Organization, consider separate link table
    provider TEXT, -- Can be Person or Organization, consider separate link table
    publication TEXT,
    publisher INTEGER REFERENCES Organizations(id), -- Assuming Organizations table exists
    recordedAt INTEGER REFERENCES Places(id), -- Assuming Places table exists
    releasedEvent TEXT,
    review_id INTEGER REFERENCES Reviews(id), -- Assuming Reviews table exists
    schemaVersion VARCHAR(20),
    sourceOrganization INTEGER REFERENCES Organizations(id), -- Assuming Organizations table exists
    spatialCoverage TEXT, -- Could be a relation to a Places table
    sponsor TEXT, -- Can be Person or Organization, consider separate link table
    temporalCoverage TEXT,
    text TEXT,
    thumbnailUrl TEXT,
    timeRequired INTERVAL,
    translationOfWork TEXT,
    typicalAgeRange VARCHAR(20),
    version VARCHAR(20),
    video TEXT, -- Could be a relation to a Videos table
    workExample TEXT
);

-- Table for Learning Resources, inheriting from CreativeWork
CREATE TABLE LearningResources (
    creative_work_id INTEGER PRIMARY KEY REFERENCES CreativeWorks(thing_id),
    assesses TEXT, -- Could be a relation to a Competencies table
    competencyRequired TEXT, -- Could be a relation to a Competencies table
    educationalAlignment TEXT,
    educationalLevel VARCHAR(100),
    educationalUse VARCHAR(100),
    learningResourceType VARCHAR(100),
    teaches TEXT -- Could be a relation to a Competencies table
);

-- Table for Courses, inheriting from LearningResource
CREATE TABLE Courses (
    learning_resource_id INTEGER PRIMARY KEY REFERENCES LearningResources(creative_work_id),
    courseCode VARCHAR(50),
    coursePrerequisites TEXT, -- Could also be a relation to other Courses
    educationalCredentialAwarded TEXT, -- Could be a relation to a Credentials table
    hasCourseInstance_id INTEGER REFERENCES CourseInstances(id),  -- Assuming you have a CourseInstances table
    numberOfCredits INTEGER,
    syllabus TEXT, -- Or potentially a relation to a SyllabusSections table
    provider_id INTEGER REFERENCES Organizations(id) -- Assuming you have an Organizations table
);

-- Example tables for relationships (you'll need to define these fully)
CREATE TABLE Organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    -- ... other organization details
);

CREATE TABLE CourseInstances (
    id SERIAL PRIMARY KEY,
    -- ... course instance details
    course_lr_id INTEGER REFERENCES Courses(learning_resource_id)
);

CREATE TABLE Persons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    -- ... other person details
);

CREATE TABLE Comments (
    id SERIAL PRIMARY KEY,
    text TEXT
    -- ... other comment details
);

CREATE TABLE Places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
    -- ... other place details
);

CREATE TABLE Reviews (
    id SERIAL PRIMARY KEY,
    reviewBody TEXT
    -- ... other review details
);