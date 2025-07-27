// Real AI Agents Learning Content
export const aiAgentsContent = {
  fundamentals: {
    agent_architecture: {
      'multi-agent-systems': {
        title: 'Multi-Agent Systems',
        description: 'Learn to design and implement intelligent agent systems',
        duration: 120,
        difficulty: 'intermediate',
        sections: [
          {
            id: 'agent-communication',
            title: 'Agent Communication Protocols',
            content: `
# Agent Communication Protocols

Multi-agent systems require effective communication protocols for coordination and collaboration.

## Message Passing Framework

\`\`\`python
import asyncio
import json
from typing import Dict, List, Any
from dataclasses import dataclass
from enum import Enum

class MessageType(Enum):
    REQUEST = "request"
    RESPONSE = "response"
    BROADCAST = "broadcast"
    COORDINATION = "coordination"

@dataclass
class Message:
    sender: str
    receiver: str
    msg_type: MessageType
    content: Dict[str, Any]
    timestamp: float

class Agent:
    def __init__(self, agent_id: str):
        self.agent_id = agent_id
        self.mailbox = []
        self.neighbors = []
        self.state = {}
    
    async def send_message(self, receiver: str, msg_type: MessageType, content: Dict):
        """Send a message to another agent"""
        message = Message(
            sender=self.agent_id,
            receiver=receiver,
            msg_type=msg_type,
            content=content,
            timestamp=asyncio.get_event_loop().time()
        )
        return message
    
    async def receive_message(self, message: Message):
        """Process incoming message"""
        self.mailbox.append(message)
        await self.process_message(message)
    
    async def process_message(self, message: Message):
        """Override this method to implement message processing logic"""
        pass
    
    async def broadcast(self, msg_type: MessageType, content: Dict):
        """Broadcast message to all neighbors"""
        for neighbor in self.neighbors:
            message = await self.send_message(neighbor, msg_type, content)
            # In real implementation, this would be sent through a message bus
            print(f"Broadcasting to {neighbor}: {content}")

class TaskAllocationAgent(Agent):
    def __init__(self, agent_id: str, capabilities: List[str]):
        super().__init__(agent_id)
        self.capabilities = capabilities
        self.current_tasks = []
    
    async def process_message(self, message: Message):
        if message.msg_type == MessageType.REQUEST:
            if message.content.get('task_type') in self.capabilities:
                # Accept task if capable
                response = await self.send_message(
                    message.sender,
                    MessageType.RESPONSE,
                    {'status': 'accepted', 'task_id': message.content.get('task_id')}
                )
                self.current_tasks.append(message.content.get('task_id'))
            else:
                # Decline task if not capable
                response = await self.send_message(
                    message.sender,
                    MessageType.RESPONSE,
                    {'status': 'declined', 'reason': 'capability_mismatch'}
                )

# Example usage
async def main():
    # Create agents
    agent1 = TaskAllocationAgent("agent1", ["data_processing", "analysis"])
    agent2 = TaskAllocationAgent("agent2", ["visualization", "reporting"])
    
    # Set up communication
    agent1.neighbors = ["agent2"]
    agent2.neighbors = ["agent1"]
    
    # Simulate task allocation
    task_request = await agent1.send_message(
        "agent2",
        MessageType.REQUEST,
        {'task_type': 'visualization', 'task_id': 'task_001', 'data': 'sample_data'}
    )
    
    await agent2.receive_message(task_request)

# Run the example
asyncio.run(main())
\`\`\`

## Consensus Protocols

\`\`\`python
class ConsensusAgent(Agent):
    def __init__(self, agent_id: str, initial_value: Any):
        super().__init__(agent_id)
        self.value = initial_value
        self.round = 0
        self.votes = {}
        self.consensus_reached = False
    
    async def propose_value(self, new_value: Any):
        """Propose a new value for consensus"""
        self.value = new_value
        await self.broadcast(MessageType.COORDINATION, {
            'action': 'propose',
            'value': new_value,
            'round': self.round
        })
    
    async def vote(self, value: Any):
        """Vote on a proposed value"""
        await self.broadcast(MessageType.COORDINATION, {
            'action': 'vote',
            'value': value,
            'round': self.round
        })
    
    async def process_message(self, message: Message):
        if message.msg_type == MessageType.COORDINATION:
            content = message.content
            if content.get('action') == 'propose':
                # Vote on proposed value
                await self.vote(content.get('value'))
            elif content.get('action') == 'vote':
                # Collect votes
                sender = message.sender
                self.votes[sender] = content.get('value')
                
                # Check if consensus reached
                if len(self.votes) >= len(self.neighbors) + 1:
                    await self.check_consensus()
    
    async def check_consensus(self):
        """Check if consensus has been reached"""
        vote_counts = {}
        for vote in self.votes.values():
            vote_counts[vote] = vote_counts.get(vote, 0) + 1
        
        # Simple majority consensus
        majority_threshold = (len(self.neighbors) + 1) // 2 + 1
        for value, count in vote_counts.items():
            if count >= majority_threshold:
                self.consensus_reached = True
                self.value = value
                print(f"Consensus reached: {value}")
                break
        
        if not self.consensus_reached:
            self.round += 1
            self.votes = {}
\`\`\`
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Implement a simple auction protocol for task allocation',
                starterCode: `
class AuctionAgent(Agent):
    def __init__(self, agent_id: str, budget: float):
        super().__init__(agent_id)
        self.budget = budget
        # Your code here
        pass
    
    async def bid(self, task_id: str, amount: float):
        # Your code here
        pass
                `,
                solution: `
class AuctionAgent(Agent):
    def __init__(self, agent_id: str, budget: float):
        super().__init__(agent_id)
        self.budget = budget
        self.active_bids = {}
    
    async def bid(self, task_id: str, amount: float):
        if amount <= self.budget:
            self.active_bids[task_id] = amount
            await self.broadcast(MessageType.COORDINATION, {
                'action': 'bid',
                'task_id': task_id,
                'amount': amount
            })
    
    async def process_message(self, message: Message):
        if message.msg_type == MessageType.COORDINATION:
            content = message.content
            if content.get('action') == 'bid':
                # Track other agents' bids
                task_id = content.get('task_id')
                bid_amount = content.get('amount')
                # Implement auction logic here
                `
              }
            ]
          }
        ]
      }
    },
    reinforcement_learning: {
      'q-learning': {
        title: 'Q-Learning for Agent Decision Making',
        description: 'Implement Q-learning algorithms for intelligent agent behavior',
        duration: 150,
        difficulty: 'intermediate',
        sections: [
          {
            id: 'q-learning-implementation',
            title: 'Q-Learning Implementation',
            content: `
# Q-Learning for Agent Decision Making

Q-learning is a reinforcement learning algorithm that enables agents to learn optimal actions through experience.

## Q-Learning Algorithm

The Q-learning update rule is:

**Q(s,a) ← Q(s,a) + α[r + γ max Q(s',a') - Q(s,a)]**

Where:
- Q(s,a) is the Q-value for state s and action a
- α is the learning rate
- r is the reward
- γ is the discount factor
- s' is the next state

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from typing import Dict, Tuple, List
import random

class QLearningAgent:
    def __init__(self, states: List, actions: List, learning_rate=0.1, discount_factor=0.9, epsilon=0.1):
        self.states = states
        self.actions = actions
        self.learning_rate = learning_rate
        self.discount_factor = discount_factor
        self.epsilon = epsilon
        
        # Initialize Q-table
        self.q_table = {}
        for state in states:
            self.q_table[state] = {}
            for action in actions:
                self.q_table[state][action] = 0.0
    
    def choose_action(self, state: str) -> str:
        """Choose action using epsilon-greedy policy"""
        if random.random() < self.epsilon:
            # Exploration: random action
            return random.choice(self.actions)
        else:
            # Exploitation: best action
            return self.get_best_action(state)
    
    def get_best_action(self, state: str) -> str:
        """Get the action with highest Q-value for given state"""
        q_values = self.q_table[state]
        max_q = max(q_values.values())
        best_actions = [action for action, q in q_values.items() if q == max_q]
        return random.choice(best_actions)
    
    def update_q_value(self, state: str, action: str, reward: float, next_state: str):
        """Update Q-value using Q-learning update rule"""
        current_q = self.q_table[state][action]
        
        # Get maximum Q-value for next state
        next_q_values = self.q_table[next_state].values()
        max_next_q = max(next_q_values) if next_q_values else 0
        
        # Q-learning update
        new_q = current_q + self.learning_rate * (
            reward + self.discount_factor * max_next_q - current_q
        )
        
        self.q_table[state][action] = new_q
    
    def get_q_table(self) -> Dict:
        """Get current Q-table"""
        return self.q_table

# Grid World Environment
class GridWorld:
    def __init__(self, width: int, height: int):
        self.width = width
        self.height = height
        self.grid = np.zeros((height, width))
        self.current_pos = (0, 0)
        self.goal = (width-1, height-1)
        
        # Define actions: up, down, left, right
        self.actions = ['up', 'down', 'left', 'right']
        
        # Define states (positions)
        self.states = []
        for x in range(width):
            for y in range(height):
                self.states.append(f"({x},{y})")
    
    def reset(self) -> str:
        """Reset environment to initial state"""
        self.current_pos = (0, 0)
        return self.get_state()
    
    def get_state(self) -> str:
        """Get current state as string"""
        return f"({self.current_pos[0]},{self.current_pos[1]})"
    
    def step(self, action: str) -> Tuple[str, float, bool]:
        """Take action and return (next_state, reward, done)"""
        x, y = self.current_pos
        
        # Update position based on action
        if action == 'up' and y > 0:
            y -= 1
        elif action == 'down' and y < self.height - 1:
            y += 1
        elif action == 'left' and x > 0:
            x -= 1
        elif action == 'right' and x < self.width - 1:
            x += 1
        
        self.current_pos = (x, y)
        next_state = self.get_state()
        
        # Calculate reward
        if self.current_pos == self.goal:
            reward = 100  # Goal reached
            done = True
        else:
            reward = -1   # Small penalty for each step
            done = False
        
        return next_state, reward, done
    
    def render(self):
        """Render the current state of the environment"""
        grid = np.zeros((self.height, self.width))
        grid[self.current_pos[1], self.current_pos[0]] = 1  # Agent
        grid[self.goal[1], self.goal[0]] = 2  # Goal
        
        plt.figure(figsize=(6, 6))
        plt.imshow(grid, cmap='RdYlBu')
        plt.title(f'Grid World - Agent at {self.current_pos}')
        plt.show()

# Training the agent
def train_q_learning_agent(episodes=1000):
    """Train Q-learning agent on grid world"""
    env = GridWorld(5, 5)
    agent = QLearningAgent(env.states, env.actions, learning_rate=0.1, epsilon=0.1)
    
    episode_rewards = []
    
    for episode in range(episodes):
        state = env.reset()
        total_reward = 0
        steps = 0
        max_steps = 100
        
        while steps < max_steps:
            # Choose action
            action = agent.choose_action(state)
            
            # Take action
            next_state, reward, done = env.step(action)
            
            # Update Q-value
            agent.update_q_value(state, action, reward, next_state)
            
            total_reward += reward
            state = next_state
            steps += 1
            
            if done:
                break
        
        episode_rewards.append(total_reward)
        
        # Decay epsilon
        if episode % 100 == 0:
            agent.epsilon = max(0.01, agent.epsilon * 0.95)
    
    return agent, episode_rewards

# Train the agent
trained_agent, rewards = train_q_learning_agent(episodes=500)

# Plot training progress
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(rewards)
plt.title('Training Progress')
plt.xlabel('Episode')
plt.ylabel('Total Reward')

# Visualize learned policy
env = GridWorld(5, 5)
policy_grid = np.zeros((5, 5))

for x in range(5):
    for y in range(5):
        state = f"({x},{y})"
        best_action = trained_agent.get_best_action(state)
        # Convert action to numerical value for visualization
        action_map = {'up': 0, 'down': 1, 'left': 2, 'right': 3}
        policy_grid[y, x] = action_map[best_action]

plt.subplot(1, 2, 2)
plt.imshow(policy_grid, cmap='viridis')
plt.title('Learned Policy')
plt.colorbar(label='Action (0=up, 1=down, 2=left, 3=right)')

plt.tight_layout()
plt.show()

print("Training completed!")
print(f"Final average reward: {np.mean(rewards[-100:]):.2f}")
\`\`\`

## Multi-Agent Q-Learning

\`\`\`python
class MultiAgentQLearning:
    def __init__(self, n_agents: int, states: List, actions: List):
        self.n_agents = n_agents
        self.agents = []
        
        for i in range(n_agents):
            agent = QLearningAgent(states, actions, epsilon=0.2)
            agent.agent_id = i
            self.agents.append(agent)
    
    def train_cooperative(self, episodes=1000):
        """Train agents in cooperative environment"""
        env = GridWorld(5, 5)
        episode_rewards = []
        
        for episode in range(episodes):
            state = env.reset()
            total_reward = 0
            steps = 0
            max_steps = 100
            
            while steps < max_steps:
                # All agents choose actions
                actions = []
                for agent in self.agents:
                    action = agent.choose_action(state)
                    actions.append(action)
                
                # Take joint action (simplified: use majority action)
                action_counts = {}
                for action in actions:
                    action_counts[action] = action_counts.get(action, 0) + 1
                
                joint_action = max(action_counts, key=action_counts.get)
                
                # Environment step
                next_state, reward, done = env.step(joint_action)
                
                # Update all agents
                for agent in self.agents:
                    agent.update_q_value(state, joint_action, reward, next_state)
                
                total_reward += reward
                state = next_state
                steps += 1
                
                if done:
                    break
            
            episode_rewards.append(total_reward)
            
            # Decay epsilon for all agents
            if episode % 100 == 0:
                for agent in self.agents:
                    agent.epsilon = max(0.01, agent.epsilon * 0.95)
        
        return episode_rewards

# Train cooperative agents
multi_agent = MultiAgentQLearning(n_agents=3, states=GridWorld(5, 5).states, actions=GridWorld(5, 5).actions)
cooperative_rewards = multi_agent.train_cooperative(episodes=300)

plt.figure(figsize=(10, 6))
plt.plot(cooperative_rewards)
plt.title('Multi-Agent Cooperative Learning')
plt.xlabel('Episode')
plt.ylabel('Total Reward')
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

## Practice Exercise

Create a competitive multi-agent environment:

\`\`\`python
class CompetitiveEnvironment:
    def __init__(self, width: int, height: int, n_agents: int):
        self.width = width
        self.height = height
        self.n_agents = n_agents
        self.agent_positions = [(0, 0) for _ in range(n_agents)]
        self.goals = [(width-1, height-1) for _ in range(n_agents)]
        self.actions = ['up', 'down', 'left', 'right']
        
        # Define states for each agent
        self.states = []
        for x in range(width):
            for y in range(height):
                self.states.append(f"({x},{y})")
    
    def reset(self):
        """Reset environment"""
        self.agent_positions = [(0, 0) for _ in range(self.n_agents)]
        return [self.get_state(i) for i in range(self.n_agents)]
    
    def get_state(self, agent_id: int) -> str:
        """Get state for specific agent"""
        pos = self.agent_positions[agent_id]
        return f"({pos[0]},{pos[1]})"
    
    def step(self, actions: List[str]) -> Tuple[List[str], List[float], bool]:
        """Take joint action and return (next_states, rewards, done)"""
        rewards = [0] * self.n_agents
        next_states = []
        
        # Update positions
        for i, action in enumerate(actions):
            x, y = self.agent_positions[i]
            
            # Update position based on action
            if action == 'up' and y > 0:
                y -= 1
            elif action == 'down' and y < self.height - 1:
                y += 1
            elif action == 'left' and x > 0:
                x -= 1
            elif action == 'right' and x < self.width - 1:
                x += 1
            
            self.agent_positions[i] = (x, y)
            next_states.append(self.get_state(i))
            
            # Calculate reward
            if (x, y) == self.goals[i]:
                rewards[i] = 100
            else:
                rewards[i] = -1
        
        # Check for collisions (penalty)
        for i in range(self.n_agents):
            for j in range(i+1, self.n_agents):
                if self.agent_positions[i] == self.agent_positions[j]:
                    rewards[i] -= 10
                    rewards[j] -= 10
        
        done = all(reward >= 100 for reward in rewards)
        return next_states, rewards, done

# Test competitive environment
def test_competitive_environment():
    env = CompetitiveEnvironment(5, 5, 2)
    agents = [QLearningAgent(env.states, env.actions) for _ in range(2)]
    
    episode_rewards = []
    
    for episode in range(200):
        states = env.reset()
        total_reward = 0
        steps = 0
        
        while steps < 50:
            # Agents choose actions
            actions = [agent.choose_action(state) for agent, state in zip(agents, states)]
            
            # Environment step
            next_states, rewards, done = env.step(actions)
            
            # Update agents
            for i, agent in enumerate(agents):
                agent.update_q_value(states[i], actions[i], rewards[i], next_states[i])
            
            total_reward = sum(rewards)
            states = next_states
            steps += 1
            
            if done:
                break
        
        episode_rewards.append(total_reward)
    
    return episode_rewards

# Run competitive training
competitive_rewards = test_competitive_environment()

plt.figure(figsize=(10, 6))
plt.plot(competitive_rewards)
plt.title('Competitive Multi-Agent Learning')
plt.xlabel('Episode')
plt.ylabel('Total Reward')
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Implement a Nash equilibrium solver for multi-agent games',
                starterCode: `
def find_nash_equilibrium(payoff_matrix):
    # Your code here
    pass
                `,
                solution: `
def find_nash_equilibrium(payoff_matrix):
    n_players = len(payoff_matrix)
    n_strategies = len(payoff_matrix[0])
    
    # Find best responses for each player
    best_responses = []
    for player in range(n_players):
        player_payoffs = payoff_matrix[player]
        best_strategy = np.argmax(player_payoffs, axis=player)
        best_responses.append(best_strategy)
    
    # Check if best responses form Nash equilibrium
    is_nash = True
    for player in range(n_players):
        if best_responses[player] != np.argmax(payoff_matrix[player], axis=player):
            is_nash = False
            break
    
    return best_responses if is_nash else None
                `
              }
            ]
          }
        ]
      }
    }
  }
};

export default aiAgentsContent; 