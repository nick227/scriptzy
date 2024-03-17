import { Prompt } from './index.js';
import Command from '../Command.js';
import * as QueryCommands from '../query/index.js';
import { RenderVoiceCommand } from '../build/index.js';

import {
  BaseMessage,
  AIMessage,
  FunctionMessage,
} from "langchain/schema";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  AIMessagePromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  PipelinePromptTemplate,
} from "langchain/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor } from "langchain/agents";
import { DynamicTool } from "@langchain/core/tools";
import { convertToOpenAIFunction } from "@langchain/core/utils/function_calling";
import { LLMChain } from "langchain/chains";
import OpenAIAPI from 'openai';
//import a text file called future-script.txt from same folder as text
import fs from 'fs';
import prompts from './prompt-list.js';
import { SaveScriptCommand } from '../script/index.js';
/*
import {
  BaseMessage,
  AIMessage,
  FunctionMessage,
} from "langchain/schema";
import {
  ChatPromptTemplate, 
  MessagesPlaceholder,
  AIMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor } from "langchain/agents";
import { DynamicTool } from "@langchain/core/tools";
import { convertToOpenAIFunction } from "@langchain/core/utils/function_calling";

import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";
import { LLMChain } from "langchain/chains";


//import { OpenAIChat } from "langchain/llms";
import { BufferMemory } from "langchain/memory";
import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  AIMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { formatDocumentsAsString } from "langchain/utils";
import { retriever } from "langchain/retriever";

import { BaseMessage } from "langchain/schema";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "langchain/runnables";
*/

export default class DefaultPromptCommand extends Command {
  constructor(req, res) {
    super();
    this.openai = new OpenAIAPI(process.env.OPENAI_API_KEY);
    this.req = req;
    this.res = res;
    this.prompts = [prompts[0]];//temp limit
    this.maxScriptLength = 1000000000;
    this.script = fs.readFileSync('./future-script.txt', 'utf8').slice(0, this.maxScriptLength);//temp static file
    this.scriptName = 'futuretellingapp.com';
    this.insertToDBCommand = new QueryCommands.InsertToDBCommand();
    this.getChatHistoryCommand = new QueryCommands.GetChatHistoryCommand();
    this.saveToChatHistoryCommand = new QueryCommands.SaveToChatHistoryCommand();
    this.renderVoiceCommand = new RenderVoiceCommand();
    this.saveScriptCommand = new SaveScriptCommand();
    this.results = [];
    //this.files = req.files;
    //this.urlParams = req.body || req.query;
    //this.prompt = new Prompt(this.urlParams.prompt, this.urlParams.template || "main_new", { prompt: this.urlParams.prompt }, this.files);
    //this.queryChatGptCommand = new QueryCommands.QueryChatGptCommand(this.req);
    //    this.getPageHistoryCommand = new QueryCommands.GetPageHistoryCommand();
    //this.getDataSourceCommand = new QueryCommands.GetDataSourceCommand(this.urlParams.prompt);
  }

  async execute() {

    this.saveScriptCommand.execute(this.script, this.scriptName);


    console.log('STOPPING');
    return;
    try {
      let result = {
        response: null,
        user: null,
      };
      for (const prompt of this.prompts) {
        const messages = [
          { role: 'system', content: prompt.message },
          { role: 'user', content: this.script }
        ];
        const options = {
          model: process.env.OPENAI_MODEL,
          messages,
          tool_choice: prompt.tool_choice,
          tools: prompt.tools
        };
        console.log("START OPENAI REQUEST", typeof options);
        const response = await this.openai.chat.completions.create(options);
        result.response = this.formatResponse(response);

        if (this.req && this.req.session && this.req.session.user) {
          result.user = this.req.session.user;
        } else {
          console.log('No user');
        }

        console.log(JSON.stringify(result, null, 2));

        let tblName = prompt.tool_choice.function.name;
        await this.insertToDBCommand.execute(result, tblName);

      }

    } catch (error) {
      console.error(error);
      this.res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  }

  formatResponse(response) {
    const toolCall = response?.choices?.[0]?.message?.tool_calls?.[0];
    const argumentsObject = toolCall?.function?.arguments ? JSON.parse(toolCall.function.arguments) : null;

    return {
      id: response?.id,
      model: response?.model,
      content: response?.choices?.[0]?.message?.content,
      usage: response?.usage,
      response: argumentsObject
    };
  }
}