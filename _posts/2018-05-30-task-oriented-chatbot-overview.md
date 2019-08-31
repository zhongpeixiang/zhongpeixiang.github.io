---
title: Task-Oriented Dialog Agents Review
tags: [review, task-oriented chatbot]
---

Task-oriented dialog agents are designed for a particular task and set up to have short conversations
 to get information from the user to help complete the task. Apple Siri and Google Assistant are common examples. 
They are different from chit-chat agents in that their primary goal is to help the users complete the task. Often, 
they are accompanied with a knowledge base about the domain.

## Table of Content

* TOC
{:toc}

## Introduction
The main components of a task-oriented dialog agent are a language understanding unit (**LU**), a dialog manager (**DM**) and a natural
language generation unit (**NLG**). LU converts human inputs into semantic representation.  DM tracks the dialogue state and use 
current semantic representation to transit to another state by executing an action under a policy. NLG converts the action into 
natural language.

![Task Oriented Chatbot Architecture]({{"/assets/img/task oriented dialog.PNG" | absolute_url}})

## Model
In this section I briefly describe the three components mentioned above.
### Language Understanding (LU)
A major task of LU is to classify the domain of a user query with domain specific intents and fill in a set of slots 
to form a semantic frame. This unit can be implemented by an LSTM or an CNN.

### Dialogue Manager (DM)
The semantic representation from LU is passed to the DM in the dialogue act form. The DM has two functions: dialogue state tracking
and policy learning. DM updates the dialogue state based on the current dialogue state and semantic representation from LU. During 
this update, DM may interact with the knowledge base and make API calls to retrive query-related facts. The policy network can be 
built hand-crafted, or via supervised learning or reinforcemnet learning.

### Natural Language Generation (NLG)
NLG generates natural language based on agent action. This can be either template-based or model-baed. Templeta-based NLG extracts 
sentences from a set of sentences. Model-based NLG extends Seq2Seq and is trained on labeled dialog dataset.

## Examples
### A Network-based End-to-End Trainable Task-oriented Dialogue System
This paper is published in *EACL 2017*. It proposes a neural end-to-end trainable goal-oriented dialogue system. Speficically, the model is
modularly connected and does not directly model the user goal, but learns to accomplish the required task by providing relevant and appropriate
responses at each turn.

![Task Oriented Chatbot Architecture 1]({{"/assets/img/task oriented dialog 1.PNG" | absolute_url}})

In the overall architecture, the model has five components: *intent network*, *belief tracker*, *data operator*, *policy network* and *generation network*.

The intent network encodes a sequence of input tokens into a distributed vector representation at every turn. Usually it can be implemented by
an LSTM or an CNN.

The belief tracker converts natural language sentences into slot-value pairs and tracks dialogue state. It can be implemented via RNN.

The data operator creates database query based on outputs from the belief tracker. It then interacts with the database and retrieve related information.

The policy network is based on the outputs from the previous three components and produces a vector representing system action.

The generation network uses the system action vector and generate the sentence through a language generator, which is usually an LSTM.


## References
Young, Steve, et al. "Pomdp-based statistical spoken dialog systems: A review." Proceedings of the IEEE 101.5 (2013): 1160-1179.

Wen, Tsung-Hsien, et al. "A network-based end-to-end trainable task-oriented dialogue system." arXiv preprint arXiv:1604.04562 (2016). 

Li, Xuijun, et al. "End-to-end task-completion neural dialogue systems." arXiv preprint arXiv:1703.01008 (2017).
