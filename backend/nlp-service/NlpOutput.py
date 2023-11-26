import nltk
import spacy
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.probability import FreqDist
from nltk.tokenize.treebank import TreebankWordDetokenizer

def identify_title_description(text):
    # Tokenize the text into sentences
    sentences = nltk.sent_tokenize(text)

    # Load the spaCy NLP model
    nlp = spacy.load("en_core_web_sm")

    # Analyze the first sentence using spaCy's NER
    first_sentence = nlp(sentences[0])

    # Extract named entities from the first sentence
    named_entities = [entity.text for entity in first_sentence.ents]

    # Identify keywords related to the main topic of the text
    keywords = identify_keywords(text)
    
    # Identify issue type based on issue-related keywords
    issue_type = identify_issue_type(keywords)

    # Determine the title based on named entities and keywords
    title = determine_title(named_entities, keywords, issue_type)

    # Refine the title by removing unnecessary words and phrases
    title = refine_title(title)

    # Generate a description using the remaining sentences
    description = generate_description(sentences[1:], keywords)

    return issue_type, title, description

def identify_keywords(text):
    # Tokenize the text into words
    words = nltk.word_tokenize(text)

    # Remove stop words
    stop_words = set(stopwords.words("english"))
    filtered_words = [word.lower() for word in words if word.isalnum() and word.lower() not in stop_words]

    # Calculate word frequencies
    fdist = FreqDist(filtered_words)

    # Get the most common words (e.g., top 5)
    keywords = [word for word, _ in fdist.most_common(5)]

    return keywords

def determine_title(named_entities, keywords, issue_type):
    # Initialize title with an empty string
    title = ""

    # Include issue type in the title if it is not None
    if issue_type:
        title += issue_type

    # Include relevant named entities and keywords if they are not already in the title
    for entity in named_entities:
        if entity not in title:
            title += " " + entity

    for keyword in keywords:
        if keyword not in title:
            title += " " + keyword

    return title

def refine_title(title):
    # Remove unnecessary words like "a", "an", and "the"
    stop_words = nltk.corpus.stopwords.words("english")

    refined_title = [word for word in title.split() if word.lower() not in stop_words]

    return " ".join(refined_title)

def generate_description(sentences, keywords):
    # Extract the most relevant sentences based on keyword presence
    relevant_sentences = [sentence for sentence in sentences if any(keyword in sentence for keyword in keywords)]

    # Combine relevant sentences into a single description
    description = ' '.join(relevant_sentences)

    return description

def identify_issue_type(keywords):
    # Define issue-related keywords for different issue types
    create_keywords = ["create", "new", "add"]
    update_keywords = ["update", "modify", "edit"]
    query_keywords = ["find", "search", "retrieve"]

    # Determine the issue type based on the presence of keywords
    issue_type = None
    for keyword in keywords:
        if keyword in create_keywords:
            issue_type = "create"
            break
        elif keyword in update_keywords:
            issue_type = "update"
            break
        elif keyword in query_keywords:
            issue_type = "query"
            break

    return issue_type

def main():
    # Read the text from a file
    # with open("input.txt", "r") as f:
    #     text = f.read()
    text = 'The customer is reporting that they are unable to log in to their account. Create a new issue for the customer service department.'

    # Identify the title and description
    issue_type, title, description = identify_title_description(text)

    # Print the title and description
    print("issue_type:", issue_type)
    print("Title:", title)
    print("Description:", description)

if __name__ == "__main__":
    main()
