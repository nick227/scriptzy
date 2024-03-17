const prompts = [{
    //character analysis
    tool_choice: {
        "type": "function",
        "function": {
            "name": "analyze_characters"
        }
    },
    message: "You are a script writing analyzer. Analyze the user prompt and return a list of character names and character objects.",
    "tools": [{
        "type": "function",
        "function": {
            "name": "analyze_characters",
            "description": "Detailed character analysis of user script.",
            "parameters": {
                "type": "object",
                "properties": {
                    "characters": {
                        "type": "array",
                        "description": "the characters in the user script",
                        "items": {
                            "type": "object",
                            "properties": {
                                "character_name": {
                                    "type": "string",
                                    "description": "The name of the character."
                                },
                                "character_description": {
                                    "type": "string",
                                    "description": "A general description of the character."
                                },
                                "character_background": {
                                    "type": "string",
                                    "description": "A brief background of the character."
                                },
                                "character_physical_description": {
                                    "type": "string",
                                    "description": "A brief physical description of the character."
                                },
                                "character_personality": {
                                    "type": "string",
                                    "description": "A brief personality of the character."
                                },
                                "character_goals": {
                                    "type": "string",
                                    "description": "The goals of the character."
                                },
                                "character_traits": {
                                    "type": "string",
                                    "description": "The traits of the character."
                                },
                                "character_fears": {
                                    "type": "string",
                                    "description": "The fears of the character."
                                },
                                "scenes": {
                                    "type": "string",
                                    "description": "A list of scenes in which the character appears."
                                },
                                "character_themes": {
                                    "type": "string",
                                    "description": "The themes of the character."
                                },
                                "character_relationships": {
                                    "type": "string",
                                    "description": "The relationship of the character with other characters."
                                },
                                "character_arc": {
                                    "type": "string",
                                    "description": "Brief description of any story arc the character has."
                                }
                            }
                        }
                    }
                }
            }
        }
    }]
}, {
    //plot analysis
    tool_choice: {
        "type": "function",
        "function": {
            "name": "analyze_plots"
        }
    },
    message: "You are a script writing analyzer. Analyze the user prompt and return a detailed deep analysis plot objects. In particular plot ideas are new ideas for what else could happen in this plot that reinforce the themes.",
    "tools": [{
        "type": "function",
        "function": {
            "name": "analyze_plots",
            "description": "Analysis of plots in user script.",
            "parameters": {
                "type": "object",
                "properties": {
                    "plots": {
                        "type": "array",
                        "description": "the plots in the user script",
                        "items": {
                            "type": "object",
                            "properties": {
                                "plot_name": {
                                    "type": "string",
                                    "description": "The name of the plot."
                                },
                                "plot_description": {
                                    "type": "string",
                                    "description": "A brief description of the plot."
                                },
                                "plot_points": {
                                    "type": "string",
                                    "description": "A list of pivotal points in the plot."
                                },
                                "plot_motivation": {
                                    "type": "string",
                                    "description": "How this plot relates to the story."
                                },
                                "plot_climax": {
                                    "type": "string",
                                    "description": "The story climax of the plot."
                                },
                                "plot_resolution": {
                                    "type": "string",
                                    "description": "The resolution of the plot."
                                },
                                "plot_subplots": {
                                    "type": "string",
                                    "description": "Any subplots time of the plot."
                                },
                                "plot_themes": {
                                    "type": "string",
                                    "description": "Analyze the themes of the plot."
                                },
                                "plot_ideas": {
                                    "type": "string",
                                    "description": "Brief original ideas for what else could happen in this plot that reinforce the themes."
                                },
                                "plot_writing_tips": {
                                    "type": "string",
                                    "description": "A professional writer analysis and critique of the plot."
                                }
                            }
                        }
                    }
                },
                "required": ["plot_name", "plot_description", "plot_motivation", "plot_points", "plot_climax", "plot_resolution", "plot_subplots", "plot_themes", "plot_ideas", "plot_writing_tips"]
            }
        }
    }]
}, {
    //scene analysis
    tool_choice: {
        "type": "function",
        "function": {
            "name": "analyze_scenes"
        }
    },
    message: "You are a script writing analyzer. Analyze the user prompt and return a list of scene names and detailed deep analysis scene objects. In particular scene ideas are new ideas for what else could happen in this scene that reinforce the themes.",
    "tools": [{
        "type": "function",
        "function": {
            "name": "analyze_scenes",
            "description": "Lists scenes in user script.",
            "parameters": {
                "type": "object",
                "properties": {
                    "scenes": {
                        "type": "array",
                        "description": "the scenes in the user script",
                        "items": {
                            "type": "object",
                            "properties": {
                                "scene_name": {
                                    "type": "string",
                                    "description": "The name of the scene."
                                },
                                "scene_description": {
                                    "type": "string",
                                    "description": "A brief description of the scene."
                                },
                                "scene_characters": {
                                    "type": "string",
                                    "description": "A list of characters in the scene."
                                },
                                "scene_location": {
                                    "type": "string",
                                    "description": "Location of the scene."
                                },
                                "scene_purpose": {
                                    "type": "string",
                                    "description": "Purpose of the scene."
                                },
                                "scene_action": {
                                    "type": "string",
                                    "description": "What happens in the scene."
                                },
                                "scene_motivation": {
                                    "type": "string",
                                    "description": "Why is this scene in the script? Does it advance the story?"
                                },
                                "scene_time": {
                                    "type": "string",
                                    "description": "Approximate time of the scene."
                                },
                                "scene_props": {
                                    "type": "string",
                                    "description": "Any props needed for the scene."
                                },
                                "scene_pages": {
                                    "type": "string",
                                    "description": "The start and end pages of this scene."
                                },
                                "scene_themes": {
                                    "type": "string",
                                    "description": "Analyze the themes of the scene."
                                },
                                "scene_ideas": {
                                    "type": "string",
                                    "description": "Brief original ideas for what else could happen in this scene that reinforce the themes."
                                },
                                "scene_colors": {
                                    "type": "string",
                                    "description": "Suggest color pallete of the scene based on the themes."
                                }
                            }
                        }
                    }
                },
                "required": ["scene_name", "scene_description", "scene_characters", "scene_location", "scene_pages", "scene_purpose", "scene_action", "scene_motivation", "scene_time", "scene_props", "scene_themes", "scene_ideas", "scene_colors"]
            }
        }
    }],
}, {
    //shot analysis
    tool_choice: {
        "type": "function",
        "function": {
            "name": "generate_shot_list"
        }
    },
    message: "You are a cinematography script shot planner. Critically analyze the user prompt as a script and generate a shot list. We don't need to change shots for everything. Remember changing shots means new camera setup and takes time and cost. Use good judgement when to change shots to advance the story. Use good visual story-telling techniques to create a shot list that will help the director and cinematographer to plan the shoot. In particular generate interesting shot ideas that reinforces the themes in addition to standard coverage. Not every action needs a shot, but every shot should have actions. Be creative and adapt to the script overall theme.",
    "tools": [{
        "type": "function",
        "function": {
            "name": "generate_shot_list",
            "description": "Generates shot list from the user script.",
            "parameters": {
                "type": "object",
                "properties": {
                    "shot_lists": {
                        "type": "array",
                        "description": "List of shots in the user script",
                        "items": {
                            "type": "object",
                            "properties": {
                                "shot_name": {
                                    "type": "string",
                                    "description": "The name of the shot"
                                },
                                "shot_description": {
                                    "type": "string",
                                    "description": "A brief description of the shot"
                                },
                                "shot_angle": {
                                    "type": "string",
                                    "description": "The shot camera angle"
                                },
                                "shot_subject": {
                                    "type": "string",
                                    "description": "The subject of the shot"
                                },
                                "shot_style": {
                                    "type": "string",
                                    "description": "The style of the shot"
                                },
                                "shot_scene": {
                                    "type": "string",
                                    "description": "The current scene of the shot"
                                },
                                "shot_motion": {
                                    "type": "string",
                                    "description": "The camera motion of the shot"
                                },
                                "shot_action": {
                                    "type": "string",
                                    "description": "The action occurring in the shot"
                                },
                                "shot_number": {
                                    "type": "string",
                                    "description": "The shot number based on scene"
                                },
                                "shot_framing": {
                                    "type": "string",
                                    "description": "The shot framing based on location"
                                },
                                "shot_composition": {
                                    "type": "string",
                                    "description": "The shot cinematic composition"
                                },
                                "shot_angle": {
                                    "type": "string",
                                    "description": "The angle of the shot"
                                },
                                "shot_ideas": {
                                    "type": "string",
                                    "description": "Original shot ideas shot that reinforce the themes"
                                }
                            }
                        }
                    }
                },
                "required": ["shot_name", "shot_description", "shot_angle", "shot_subject", "shot_style", "shot_scene", "shot_motion", "shot_action", "shot_number", "shot_ideas"]
            }
        }
    }]
}, {
    //lighting analysis
    tool_choice: {
        "type": "function",
        "function": {
            "name": "generate_lighting_setups_list"
        }
    },
    message: "You are a genius film and tv lighting planner. Analyze the user prompt as a script and identify lighting setup changes for scenes or instances. Write a detailed object list to help the director and cinematographer to plan the shoot. In particular generate interesting lighting ideas that reinforces the themes in addition to standard coverage. Not every action needs a lighting change, but every lighting change should have actions. Be creative and adapt to the script overall theme.",
    "tools": [{
        "type": "function",
        "function": {
            "name": "generate_lighting_setups_list",
            "description": "Generates lighting setups from the user script.",
            "parameters": {
                "type": "object",
                "properties": {
                    "lighting_lists": {
                        "type": "array",
                        "description": "List of lighting setups in the user script",
                        "items": {
                            "type": "object",
                            "properties": {
                                "lighting_setup_name": {
                                    "type": "string",
                                    "description": "The name of the lighting setup"
                                },
                                "lighting_setup_description": {
                                    "type": "string",
                                    "description": "A brief description of the lighting"
                                },
                                "lighting_setup_light_sources": {
                                    "type": "array",
                                    "description": "List of lights needed for shooting the scene",
                                    "items": {
                                        type: "object",
                                        description: "The light source for the scene",
                                        "properties": {
                                            "light_source_name": {
                                                "type": "string",
                                                "description": "The name of the light source"
                                            },
                                            "light_source_type": {
                                                "type": "string",
                                                "description": "The type of the light source"
                                            },
                                            "light_source_intensity": {
                                                "type": "string",
                                                "description": "The intensity of the light source"
                                            },
                                            "light_source_color": {
                                                "type": "string",
                                                "description": "The color of the light source"
                                            },
                                            "light_source_position": {
                                                "type": "string",
                                                "description": "The position of the light source"
                                            },
                                            "light_source_angle": {
                                                "type": "string",
                                                "description": "The angle of the light source"
                                            },
                                            "light_source_ideas": {
                                                "type": "string",
                                                "description": "Original lighting ideas for the light source"
                                            }
                                        }, 
                                        "required": ["light_source_name", "light_source_type", "light_source_intensity", "light_source_color", "light_source_position", "light_source_angle", "light_source_ideas"]
                                    }
                                },
                                "lighting_setup_ideas": {
                                    "type": "string",
                                    "description": "Original lighting ideas lighting that reinforce the themes"
                                }, 
                                "lighting_setup_theme": {
                                    "type": "string",
                                    "description": "The lighting setup theme"
                                }, 
                                "lighting_setup_directions": {
                                    "type": "string",
                                    "description": "Directions for the gaffers and director"
                                }, 
                                "lighting_setup_gear": {
                                    "type": "string",
                                    "description": "Special gear needed for the lighting setup"
                                }, 
                                "scene_name": {
                                    "type": "string",
                                    "description": "The name of the current scene"
                                }
                            }
                        }
                    }
                },
                "required": ["lighting_setup_name", "lighting_setup_description", "lighting_setup_light_sources", "lighting_setup_ideas", "scene_name", "lighting_setup_gear", "lighting_setup_directions", "lighting_setup_theme"]
            }
        }
    }]
}, {
    //writing_consultation analysis
    tool_choice: {
        "type": "function",
        "function": {
            "name": "writing_consultation"
        }
    },
    message: "You are a genius film and tv writing consultant. Analyze the user prompt and generate a professional writing consultation. Return: Story Structure, Character Development, Pacing and Tension, Theme and Message, Genre and comparisons, Feedback and Revisions. In particular analyze, suggest, discuss and critique the user script as a professional Hollywood script writing consultantat. Thorough in-depth consultation of the user script. Discusses the script writing, themes, vision and feasability. Provides constructive feedback with specific examples and suggestions. Recommends revisions and ideas to enhance the script’s quality",
    "tools": [{
        "type": "function",
        "function": {
            "name": "writing_consultation",
            "description": "Analyzes, suggests, discusses and critiques user script as a professional Hollywood script writing consultantat.",
            "parameters": {
                "type": "object",
                "properties": {
                    "story_structure": {
                        "type": "string",
                        "description": "return summary and critique of the start, middle, end progression of the script."
                    }, 
                    "theme_message": {
                        "type": "string",
                        "description": "What are the major themes and messages of the script. How to improve them."
                    }, 
                    "pacing_tension": {
                        "type": "string",
                        "description": "Describe the pacing and tension of the script. Discuss how to improve it."
                    }, 
                    "character_development": {
                        "type": "string",
                        "description": "Describe the character development of the script. Discuss how to improve it."
                    }, 
                    "genre_comparisons": {
                        "type": "string",
                        "description": "Identify the genre of the script. Compare it to other scripts in the same genre. Discuss how to improve it."
                    }, 
                    "feedback_revisions": {
                        "type": "string",
                        "description": "Finally, provide constructive feedback with specific examples and suggestions. Recommend revisions and ideas to enhance the script’s quality."
                    }, 
                    "crazy_idea": {
                        "type": "string",
                        "description": "Think of one crazy drastic idea that you think will improve the script. Explain why you think it will improve the script."
                    }
                },
                "required": ["story_structure", "theme_message", "pacing_tension", "character_development", "genre_comparisons", "feedback_revisions", "crazy_idea"]
            }
        }
    }]
}, {
    //idea brainstorming
    tool_choice: {
        "type": "function",
        "function": {
            "name": "idea_brainstorming"
        }
    },
    message: "You are the most inventive writer in the world. The user prompt is a script. Analyze the script and generate three or more good ideas for each category. The categories are: wild_bizarre, suprise_twise, touching_heartwarming, scary_horror, comedy_hilarious, action_adrenalin, love_romance_ideas, story_structure_ideas, new_character_ideas, new_opening_scenes. Be brief and original. You MUST RETURN AT LEAST TWO IDEAS FOR EACH CATEGORY! Since there are 10 categories, you must return at least 20 ideas. Be creative and inventive.",
    "tools": [{
        "type": "function",
        "function": {
            "name": "idea_brainstorming",
            "description": "Analyzes, suggests, discusses and critiques user script as a professional Hollywood script writing consultantat.",
            "parameters": {
                "type": "object",
                "properties": {
                    "wild_bizarre_ideas": {
                        "type": "array",
                        "description": "List of wild bizarre ideas",
                        "items":{
                            "type": "string",
                            "description": "Original wild bizarre idea"
                        }
                    }, 
                    "suprise_twist_ideas": {
                        "type": "array",
                        "description": "List of unexpected twist ideas",
                        "items":{
                            "type": "string",
                            "description": "Original twist idea"
                        }
                    }, 
                    "touching_heartwarming_ideas": {
                        "type": "array",
                        "description": "List of touching heart-warming ideas",
                        "items":{
                            "type": "string",
                            "description": "Original touching heart-warming idea"
                        }
                    }, 
                    "scary_horror_ideas": {
                        "type": "array",
                        "description": "List of scary horror ideas",
                        "items":{
                            "type": "string",
                            "description": "Original scary horror idea"
                        }
                    }, 
                    "comedy_hilarious_ideas": {
                        "type": "array",
                        "description": "List of comedy hilarious ideas",
                        "items":{
                            "type": "string",
                            "description": "Original hilarious comedy idea"
                        }
                    }, 
                    "action_adrenaline_ideas": {
                        "type": "array",
                        "description": "List of action adrenaline ideas",
                        "items":{
                            "type": "string",
                            "description": "Original adrenaline action idea"
                        }
                    }, 
                    "love_romance_ideas": {
                        "type": "array",
                        "description": "List of romance love ideas",
                        "items":{
                            "type": "string",
                            "description": "Original love romance idea"
                        }
                    }, 
                    "story_structure_ideas": {
                        "type": "array",
                        "description": "List ideas about changing the story structure to be more engaging.",
                        "items":{
                            "type": "string",
                            "description": "Change story structure idea"
                        }
                    }, 
                    "new_character_ideas": {
                        "type": "array",
                        "description": "List of new character ideas",
                        "items":{
                            "type": "string",
                            "description": "Potential new character idea"
                        }
                    }, 
                    "new_opening_scenes": {
                        "type": "array",
                        "description": "List of new opening scene ideas",
                        "items":{
                            "type": "string",
                            "description": "Meaningful opening scene idea"
                        }
                    }
                },
                "required": ["new_opening_scenes", "new_character_ideas", "story_structure_ideas", "love_romance_ideas", "action_adrenaline_ideas", "comedy_hilarious_ideas", "scary_horror_ideas", "touching_heartwarming_ideas", "suprise_twist_ideas", "wild_bizarre_ideas"]
            }
        }
    }]
}, {
    //locations sets design
    tool_choice: {
        "type": "function",
        "function": {
            "name": "locations_set_production_designer"
        }
    },
    message: "You are seasoned film and tv locations set designer and production art director. Analyze the user prompt as a script and generate a detailed list of locations, designs, props, colors, lighting, costumes and visual ideas that reinforces the themes in addition to standard coverage. Be creative and adapt to the script overall theme. Generate high-quality, innovative, creative, interesting and original ideas that will help the director and cinematographer to plan the shoot.",
    "tools": [{
        "type": "function",
        "function": {
            "name": "locations_set_production_designer",
            "description": "Planning the location set and production design for the script.",
            "parameters": {
                "type": "object",
                "properties": {
                    "locations": {
                        "type": "array",
                        "description": "List of wild bizarre ideas",
                        "items":{
                            "type": "object",
                            "description": "Location set design objects",
                            "properties": {
                                "location_name": {
                                    "type": "string",
                                    "description": "The name of the location"
                                },
                                "location_description": {
                                    "type": "string",
                                    "description": "A detailed description of the location for the set designer and director."
                                },
                                "location_cinematic_ideas": {
                                    "type": "string",
                                    "description": "Creative thematic details of the location. Be extra creative and think of the location as a character in the story. Discover unique camera angle opportunities and how the location can be used to tell the story. "
                                },
                                "location_color_profile": {
                                    "type": "string",
                                    "description": "The color profile of the location"
                                },
                                "location_visual_ideas": {
                                    "type": "string",
                                    "description": "Unusual clever visual ideas that take advantage of the location. Invent a clever camera trick or visual effect that can be used in the location."
                                },
                                "location_ai_image_prompt": {
                                    "type": "string",
                                    "description": "Write a detailed prompt with many descriptive details about subject and style and lighting and tone for the AI to generate an image of the location"
                                },
                                "set_design_ideas": {
                                    "type": "string",
                                    "description": "Notes and instructions for set design team. Emphasize any required set design elements, and any special considerations for the set design."
                                },
                                "location_theme": {
                                    "type": "string",
                                    "description": "Script themes for the location"
                                },
                                "location_type": {
                                    "type": "string",
                                    "description": "What type of location is it?"
                                },
                                "location_lighting": {
                                    "type": "string",
                                    "description": "The lighting of the location"
                                },
                                "special_fx_ideas": {
                                    "type": "string",
                                    "description": "Special effects ideas for the location"
                                },
                                "props_costumes_ideas": {
                                    "type": "string",
                                    "description": "Props and costumes ideas for the location"
                                },
                                "list_of_physical_location_ideas": {
                                    "type": "array",
                                    "description": "List of three or more actual real-world locations that could film this scene at. For example, a real-world location idea might be a specific restaurant, a specific rental type, a volunteer house, etc. It may be a location that the production designer could build a set for, or it may be a location that the production designer could scout and film at. The more specific the better.",
                                    "items": {
                                        "type": "string",
                                        "description": "Real-world location idea"
                                    }
                                }, 
                                "scenes_names": {
                                    "type": "string",
                                    "description": "The scenes that take place in the location"
                                }
                            }
                        }
                    }
                },
                "required": ["scenes_names", "list_of_physical_location_ideas", "props_costumes_ideas", "special_fx_ideas", "location_lighting", "location_type", "location_theme", "set_design_ideas", "location_ai_image_prompt", "location_visual_ideas", "location_color_profile", "location_cinematic_ideas", "location_description", "location_name"]
            }
        }
    }]
}, {
    //budget_schedule_estimate 
    tool_choice: {
        "type": "function",
        "function": {
            "name": "budget_schedule_estimate"
        }
    },
    message: "Analyze the user prompt as a script and generate a detailed list of budgets and schedules for the script. We need to divide the budget into categories and estimate the cost of each category. We also need to estimate the time and cost it will take to shoot each scene. Finally list the cast, crew, and equipment needed for the shoot.",
    "tools": [{
        "type": "function",
        "function": {
            "name": "budget_schedule_estimate",
            "description": "Planning the budget and schedule for the script.",
            "parameters": {
                "type": "object",
                "properties": {
                    "crew_members": {
                        "type": "array",
                        "description": "List of crew members",
                        "items":{
                            "type": "object",
                            "description": "Crew member hire",
                            "properties": {
                                "crew_member_type": {
                                    "type": "string",
                                    "description": "The type of the crew member"
                                },
                                "crew_member_cost": {
                                    "type": "string",
                                    "description": "Estimated dollar amount to pay crew member."
                                },
                                "crew_member_hours": {
                                    "type": "string",
                                    "description": "Estimated hours to work for crew member."
                                },
                                "crew_member_skills": {
                                    "type": "string",
                                    "description": "The skills of the crew member."
                                }
                            }
                        }
                    }, 
                    "cast_members": {
                        "type": "array",
                        "description": "List of cast members",
                        "items":{
                            "type": "object",
                            "description": "cast members to hire",
                            "properties": {
                                "cast_member_type": {
                                    "type": "string",
                                    "description": "The type of the cast member"
                                },
                                "cast_member_cost": {
                                    "type": "string",
                                    "description": "Estimated dollar amount to pay cast member."
                                },
                                "cast_member_hours": {
                                    "type": "string",
                                    "description": "Estimated hours to work for cast member."
                                },
                                "cast_member_description": {
                                    "type": "string",
                                    "description": "The description of the cast member."
                                }
                            }
                        }
                    }, 
                    "equiptment_rentals": {
                        "type": "array",
                        "description": "List of equiptment and rentals",
                        "items":{
                            "type": "object",
                            "description": "item to rent or procure",
                            "properties": {
                                "equiptment_rentals_type": {
                                    "type": "string",
                                    "description": "The type equiptment or rental"
                                },
                                "equiptment_rentals_cost": {
                                    "type": "string",
                                    "description": "Estimated dollar amount for equiptment or rental"
                                },
                                "equiptment_rentals_hours": {
                                    "type": "string",
                                    "description": "Estimated hours to work for equiptment or rental"
                                },
                                "equiptment_rentals_description": {
                                    "type": "string",
                                    "description": "The description of the equiptment or rental"
                                }
                            }
                        }
                    }
                },
                "required": ["equiptment_rentals", "cast_members", "crew_members"]
            }
        }
    }]
}, {
    //ai_image prompts 
    tool_choice: {
        "type": "function",
        "function": {
            "name": "ai_inspiration_image_prompt_generator"
        }
    },
    message: "Analyze the user prompt as a script and generate ai inspiration image generation prompts, for key scenes in the script. Prompt object that each contain various style inspiration image prompts. Include a detailed prompt with many descriptive details about subject and style and lighting and tone for the AI to generate an image. Generate creative, inspiring and visual original thematic ideas. Construct cinematic creative imagery that is relevant and also immersive unique compositions. Remember these are inspirational images to plan the visual identity. The images should be interesting and detailed and convey the theme of the story but don't have to actually be of the story itself. This is thematic inspiration for the director and cinematographer. Use generic descriptions of the characters and scenes. Remember the AI image generator has not seen the script. We have to describe the inspiration images in detailed 200+ word prompts. Include adjective-rich descriptions of the characters and scenes. The more detailed the better. Describe the camera angle and lighting and tone and style and mood and color and composition and subject and background and foreground and any other relevant details. The prompts must be at least 200+ words long. Include fine detail in the prompt about the subject. Add AI boost words such as photogentic, detailed, expressive, photogenic. The prompts should be detailed and expressive and visually appealing. The prompts should be at least 200 words long. You love stylized cinematic creative shots. Create a mix of close and long shots. Emphasize the important details. You are a artistic genius at visual inspiration image prompt generator.",
    "tools": [{
        "type": "function",
        "function": {
            "name": "ai_inspiration_image_prompt_generator",
            "description": "Generates expressive detail-rich 200+ word prompts for AI to generate inspirational imagery about the script themes.",
            "parameters": {
                "type": "object",
                "properties": {
                    "prompt_objects": {
                        "type": "array",
                        "description": "List of extensive detailed 200+ words or longer ai image prompt objects",
                        "items":{
                            "type": "object",
                            "description": "Various styles of detailed and expressive visually appealing inspiration image prompt at least 200 words long",
                            "properties": {
                                "dark_moody_inspiration": {
                                    "type": "string",
                                    "description": "A detailed 200+ word prompt for a dark moody inspiration image"
                                },
                                "realistic_inspiration": {
                                    "type": "string",
                                    "description": "A detailed 200+ word prompt for a realistic inspiration image"
                                },
                                "bright_colorful_inspiration": {
                                    "type": "string",
                                    "description": "A detailed 200+ word prompt for a bright colorful inspiration image"
                                },
                                "serious_dramatic_inspiration": {
                                    "type": "string",
                                    "description": "A detailed 200+ word prompt for a serious dramatic inspiration image"
                                },
                                "abstract_experimental_film_inspiration": {
                                    "type": "string",
                                    "description": "A detailed 200+ word prompt for a abstract experimental film inspiration image"
                                }
                            }
                        }
                    }
                },
                "required": ["prompt_objects"]
            }
        }
    }]
}, {
    //script_beats_generator  
    tool_choice: {
        "type": "function",
        "function": {
            "name": "script_beats_generator"
        }
    },
    message: "Analyze the user prompt as a script and generate all the story beats. Story beats are short brief sentence description of something that happens in the story that can be interchanged. Visualize post-it notes one a white-board full of the story beats.",
    "tools": [{
        "type": "function",
        "function": {
            "name": "script_beats_generator",
            "description": "Generates brief short story beats that can be interchanged. The beats are short brief sentence descriptions of something that happens in the story.",
            "parameters": {
                "type": "object",
                "properties": {
                    "script_beats": {
                        "type": "array",
                        "description": "Story beat description",
                        "items":{
                            "type": "string",
                            "description": "Short brief sentence description of something that happens in the story."
                        }
                    }
                },
                "required": ["script_beats_generator"]
            }
        }
    }]
}];

export default prompts;