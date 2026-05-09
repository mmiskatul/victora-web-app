import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import VictoryHeader from '../../components/VictoryHeader';
import { apiRequest } from '../../lib/api';

const TOTAL_STEPS = 8;

const GOALS = [
  { id: 'g1', emoji: '🔥', label: 'Weight Loss & Fat Burn' },
  { id: 'g2', emoji: '💪', label: 'Build & Strengthen Muscles' },
  { id: 'g3', emoji: '⚡', label: 'Maintain Weight & Feel Fit' },
  { id: 'g4', emoji: '🧘', label: 'Improve Flexibility & Mobility' },
  { id: 'g5', emoji: '❤️', label: 'Boost Energy & Endurance' },
];

const DIET_PREFS = [
  { id: 'd1', emoji: '🌎', label: 'Everything' },
  { id: 'd2', emoji: '🌱', label: 'Vegetarian' },
  { id: 'd3', emoji: '🍎', label: 'Vegan' },
  { id: 'd4', emoji: '🥩', label: 'Keto / Low-Carb' },
  { id: 'd5', emoji: '🌾', label: 'Gluten-Free' },
  { id: 'd6', emoji: '🥜', label: 'Nut-Free' },
];

const ACTIVITY_LEVELS = [
  { id: 'a1', emoji: '🖥️', label: 'Sedentary (Office job)' },
  { id: 'a2', emoji: '🚶', label: 'Lightly active (Occasional walking)' },
  { id: 'a3', emoji: '🏃', label: 'Active (Regular movement)' },
  { id: 'a4', emoji: '🔧', label: 'Very active (Physical labor)' },
];

const GENDERS = ['Please select...', 'Male', 'Female', 'Non-binary', 'Prefer not to say'];

const HEALTH_CONDITIONS = [
  { id: 'h1', emoji: '❤️', label: 'High Blood Pressure' },
  { id: 'h2', emoji: '🩸', label: 'Diabetes' },
  { id: 'h3', emoji: '🍔', label: 'High Cholesterol' },
  { id: 'h4', emoji: '🔥', label: 'Inflammation' },
  { id: 'h5', emoji: '🛡️', label: 'Low Immunity' },
  { id: 'h6', emoji: '😵', label: 'Digestive Issues' },
];

function OptionList({
  items,
  selected,
  onSelect,
}: {
  items: { id: string; emoji: string; label: string; sub?: string }[];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <View style={styles.optionList}>
      {items.map((item) => {
        const active = selected === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.optionCard, active && styles.optionCardActive]}
            onPress={() => onSelect(item.id)}
            activeOpacity={0.85}
          >
            <Text style={styles.optionEmoji}>{item.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>{item.label}</Text>
              {item.sub ? <Text style={styles.optionSub}>{item.sub}</Text> : null}
            </View>
            {active && (
              <View style={styles.optionCheck}>
                <Ionicons name="checkmark" size={13} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/* ── Meal Plan Data ── */
const PLAN_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const PLAN_TABS = ['My Plan', 'Tracker', 'Meal Analysis'];

type MealEntry = { name: string; desc: string; kcal: number; p: number; c: number; f: number; ingredients: string[]; instructions?: string[]; };
type DayPlan = { breakfast: MealEntry; lunch: MealEntry; dinner: MealEntry; };
type NutritionProfile = {
  goal: string | null;
  cuisine: string;
  favoriteMeal: string;
  selectedDiet: string | null;
  allergies: string;
  selectedActivity: string | null;
  age: string;
  gender: string;
  height: string;
  weight: string;
  healthConditions: string[];
};
type NutritionPlanApiResponse = {
  plan_id?: string | null;
  summary: string;
  goal_label: string;
  days: Array<{ day: string; breakfast: MealEntry; lunch: MealEntry; dinner: MealEntry }>;
  shopping_list: Array<{ category: string; items: Array<{ name: string; qty: string }> }>;
};

const MEAL_PLAN: Record<string, DayPlan> = {
  Mon: {
    breakfast: { name: 'Oatmeal with Mashed Banana', desc: 'A small, comforting bowl of oats naturally sweetened.', kcal: 250, p: 4, c: 45, f: 5, ingredients: ['½ cup rolled oats', '1 ripe banana', '1 cup water', 'Pinch of cinnamon'] },
    lunch: { name: 'Rice and Mild Lentil Stew', desc: 'A balanced portion of complex carbs and plant protein.', kcal: 300, p: 8, c: 50, f: 5, ingredients: ['½ cup white rice', '½ cup red lentils', '1 tomato', '1 onion', 'Spices'], instructions: ['Rinse lentils and boil until soft.', 'Sauté onion and tomato, add lentils.', 'Serve over cooked rice.'] },
    dinner: { name: 'Chicken and Sweet Potato Mash', desc: 'Lean protein paired with vitamin-rich sweet potatoes.', kcal: 250, p: 8, c: 30, f: 6, ingredients: ['100g chicken breast', '1 medium sweet potato', '1 tsp olive oil', 'Salt, pepper, garlic'], instructions: ['Boil and mash sweet potato.', 'Grill chicken with spices.', 'Serve alongside mash.'] },
  },
  Tue: {
    breakfast: { name: 'Scrambled Eggs & Toast', desc: 'Classic protein-rich morning fuel.', kcal: 280, p: 14, c: 30, f: 10, ingredients: ['2 eggs', '1 slice whole-grain bread', '1 tsp butter', 'Salt & pepper'] },
    lunch: { name: 'Grilled Chicken Salad', desc: 'Fresh greens with grilled protein.', kcal: 320, p: 26, c: 15, f: 12, ingredients: ['120g chicken breast', 'Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Olive oil dressing'], instructions: ['Grill chicken and slice.', 'Toss vegetables with dressing.', 'Top with chicken.'] },
    dinner: { name: 'Vegetable Stir Fry & Brown Rice', desc: 'Colorful vegetables with whole grain.', kcal: 270, p: 7, c: 48, f: 6, ingredients: ['½ cup brown rice', 'Bell peppers', 'Broccoli', 'Soy sauce', 'Garlic'], instructions: ['Cook brown rice.', 'Stir-fry vegetables in light oil.', 'Season and serve over rice.'] },
  },
  Wed: {
    breakfast: { name: 'Greek Yogurt & Berries', desc: 'Probiotic-rich with antioxidants.', kcal: 180, p: 12, c: 22, f: 4, ingredients: ['200g Greek yogurt', '½ cup mixed berries', '1 tsp honey'] },
    lunch: { name: 'Lentil Soup & Bread', desc: 'Hearty legume-based soup.', kcal: 310, p: 14, c: 52, f: 4, ingredients: ['1 cup lentils', 'Carrots', 'Celery', 'Onion', '1 slice bread'], instructions: ['Sauté vegetables.', 'Add lentils and broth.', 'Simmer 25 minutes.'] },
    dinner: { name: 'Baked Salmon & Veggies', desc: 'Omega-rich fish with roasted vegetables.', kcal: 340, p: 28, c: 18, f: 14, ingredients: ['120g salmon', 'Zucchini', 'Bell pepper', 'Olive oil', 'Lemon'], instructions: ['Preheat oven to 200°C.', 'Season salmon and vegetables.', 'Bake 20 mins together.'] },
  },
  Thu: {
    breakfast: { name: 'Smoothie Bowl', desc: 'Blended fruits with crunchy toppings.', kcal: 220, p: 6, c: 40, f: 5, ingredients: ['1 banana', '½ cup frozen berries', 'Almond milk', 'Granola', 'Chia seeds'] },
    lunch: { name: 'Tuna Wrap', desc: 'Protein-packed whole wheat wrap.', kcal: 350, p: 24, c: 38, f: 8, ingredients: ['1 can tuna', 'Whole wheat wrap', 'Lettuce', 'Tomato', 'Light mayo'], instructions: ['Mix tuna with light mayo.', 'Layer vegetables on wrap.', 'Roll tightly and serve.'] },
    dinner: { name: 'Beef & Vegetable Soup', desc: 'Lean beef in a hearty broth.', kcal: 290, p: 20, c: 28, f: 9, ingredients: ['100g lean beef', 'Potatoes', 'Carrots', 'Onion', 'Beef broth'], instructions: ['Brown beef cubes.', 'Add broth and vegetables.', 'Simmer 30 minutes.'] },
  },
  Fri: {
    breakfast: { name: 'Avocado Toast', desc: 'Healthy fats on whole grain bread.', kcal: 260, p: 7, c: 28, f: 14, ingredients: ['1 avocado', '2 slices bread', 'Lemon juice', 'Red pepper flakes'] },
    lunch: { name: 'Chickpea Curry', desc: 'Plant protein in aromatic spices.', kcal: 330, p: 12, c: 50, f: 8, ingredients: ['1 can chickpeas', 'Tomatoes', 'Coconut milk', 'Curry powder', 'Rice'], instructions: ['Saute spices.', 'Add chickpeas and tomatoes.', 'Simmer with coconut milk 15 mins.'] },
    dinner: { name: 'Shrimp & Quinoa Bowl', desc: 'Light seafood with complete protein grain.', kcal: 310, p: 22, c: 35, f: 8, ingredients: ['150g shrimp', '½ cup quinoa', 'Spinach', 'Garlic', 'Olive oil'], instructions: ['Cook quinoa.', 'Saute garlic and shrimp.', 'Serve over quinoa with spinach.'] },
  },
  Sat: {
    breakfast: { name: 'Pancakes with Fruit', desc: 'Whole grain pancakes with fresh fruit.', kcal: 320, p: 9, c: 55, f: 7, ingredients: ['1 cup whole wheat flour', '1 egg', 'Milk', 'Baking powder', 'Mixed berries'] },
    lunch: { name: 'Turkey & Vegetable Sandwich', desc: 'Lean turkey on seeded bread.', kcal: 340, p: 22, c: 38, f: 9, ingredients: ['100g turkey breast', 'Seeded bread', 'Lettuce', 'Tomato', 'Mustard'], instructions: ['Layer turkey and vegetables.', 'Add condiments.', 'Serve with salad.'] },
    dinner: { name: 'Pasta Primavera', desc: 'Whole grain pasta with garden vegetables.', kcal: 380, p: 12, c: 65, f: 8, ingredients: ['80g whole grain pasta', 'Zucchini', 'Cherry tomatoes', 'Basil', 'Parmesan'], instructions: ['Cook pasta al dente.', 'Saute vegetables in olive oil.', 'Toss together with basil.'] },
  },
  Sun: {
    breakfast: { name: 'French Toast', desc: 'Egg-soaked bread with cinnamon.', kcal: 290, p: 10, c: 42, f: 9, ingredients: ['2 slices bread', '2 eggs', 'Milk', 'Cinnamon', 'Maple syrup'] },
    lunch: { name: 'Bean & Vegetable Burrito', desc: 'Fibre-rich bean burrito.', kcal: 360, p: 14, c: 58, f: 8, ingredients: ['1 whole wheat tortilla', '½ cup black beans', 'Brown rice', 'Peppers', 'Salsa'], instructions: ['Warm beans and rice.', 'Layer in tortilla with peppers.', 'Roll and enjoy.'] },
    dinner: { name: 'Roast Chicken & Steamed Broc', desc: 'Simple roasted protein with greens.', kcal: 300, p: 26, c: 12, f: 11, ingredients: ['120g chicken thigh', 'Broccoli', 'Garlic', 'Olive oil', 'Herbs'], instructions: ['Roast chicken at 200C 30 mins.', 'Steam broccoli 5-7 mins.', 'Serve with lemon juice.'] },
  },
};

/* ── Weekly Shopping List Data ── */
const SHOPPING_LIST = [
  {
    category: 'Produce',
    items: [
      { name: 'Mixed Berries', qty: '30g' },
      { name: 'Carrots', qty: '2 medium' },
      { name: 'Celery', qty: '1 bunch' },
      { name: 'Mixed Stir-fry Veggies', qty: '50g' },
      { name: 'Apples', qty: '1' },
      { name: 'Cucumber', qty: '1' },
      { name: 'Cherry Tomatoes', qty: '1 small box' },
      { name: 'Sweet Corn', qty: '30g' },
      { name: 'Tomato', qty: '1' },
      { name: 'Sweet Potatoes', qty: '2 medium' },
      { name: 'Mixed Peas and Carrots', qty: '40g' },
      { name: 'Bananas', qty: '3' },
      { name: 'Zucchini', qty: '1 large' },
      { name: 'Bell Pepper', qty: '1' },
      { name: 'Pear', qty: '1' },
      { name: 'Potatoes', qty: '1' },
      { name: 'Broccoli', qty: '1 small head' },
    ],
  },
  {
    category: 'Dairy & Alternatives',
    items: [
      { name: 'Milk (or plant-based)', qty: '200ml' },
      { name: 'Greek Yogurt', qty: '120g' },
      { name: 'Cheddar Cheese', qty: '10g' },
      { name: 'Butter', qty: '10g' },
      { name: 'Feta Cheese', qty: '20g' },
      { name: 'Cottage Cheese', qty: '50g' },
      { name: 'Parmesan Cheese', qty: '10g' },
      { name: 'Eggs', qty: '2 large' },
    ],
  },
  {
    category: 'Proteins',
    items: [
      { name: 'Firm Tofu', qty: '90g' },
    ],
  },
  {
    category: 'Pantry & Grains',
    items: [
      { name: 'Gluten-free Oats', qty: '60g' },
      { name: 'Cooked Lentils', qty: '50g' },
      { name: 'Vegetable Broth', qty: '150ml' },
      { name: 'White Rice', qty: '150g (uncooked weight equiv)' },
      { name: 'Olive Oil', qty: '1 small bottle' },
      { name: 'Soy Sauce', qty: '1 small bottle' },
      { name: 'Cooked Chickpeas', qty: '50g' },
      { name: 'Black Beans', qty: '60g' },
      { name: 'Pinto Beans', qty: '80g' },
      { name: 'Quinoa', qty: '80g (uncooked weight equiv)' },
      { name: 'Gluten-free Crackers', qty: '1 box' },
      { name: 'Coconut Milk', qty: '30ml' },
      { name: 'Gluten-free Pancake Mix', qty: '30g' },
      { name: 'Tomato Broth', qty: '150ml' },
      { name: 'Kidney Beans', qty: '30g' },
      { name: 'Mixed Beans', qty: '60g' },
    ],
  },
  {
    category: 'Spices & Condiments',
    items: [
      { name: 'Sesame Oil', qty: '1 small bottle' },
      { name: 'Honey', qty: '1 small jar' },
      { name: 'Apple Cider Vinegar', qty: '1 small bottle' },
      { name: 'Lemon Juice', qty: '1 small bottle' },
      { name: 'Cinnamon', qty: '1 small jar' },
      { name: 'Mild Curry Powder', qty: '1 small jar' },
      { name: 'Paprika', qty: '1 small jar' },
    ],
  },
];

/* ── MealPlanResult Component ── */
function MealPlanResult({
  profile,
  initialPlan,
}: {
  profile: NutritionProfile;
  initialPlan?: NutritionPlanApiResponse | null;
}) {
  const [planTab, setPlanTab] = useState('My Plan');
  const [activeDay, setActiveDay] = useState('Mon');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [mealSearch, setMealSearch] = useState('');
  const [showShopping, setShowShopping] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [generatedPlan, setGeneratedPlan] = useState<NutritionPlanApiResponse | null>(initialPlan ?? null);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [nutritionAdvice, setNutritionAdvice] = useState('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (initialPlan) {
      setGeneratedPlan(initialPlan);
      setLoadingPlan(false);
      return () => {
        cancelled = true;
      };
    }

    const loadPlan = async () => {
      setLoadingPlan(true);
      try {
        const response = await apiRequest<NutritionPlanApiResponse>('/ai/nutrition/plan/latest');
        if (!cancelled) {
          setGeneratedPlan(response);
        }
      } catch {
        if (!cancelled) {
          setGeneratedPlan(null);
        }
      } finally {
        if (!cancelled) {
          setLoadingPlan(false);
        }
      }
    };

    loadPlan();

    return () => {
      cancelled = true;
    };
  }, [
    initialPlan,
    profile.goal,
    profile.cuisine,
    profile.favoriteMeal,
    profile.selectedDiet,
    profile.allergies,
    profile.selectedActivity,
    profile.age,
    profile.gender,
    profile.height,
    profile.weight,
    profile.healthConditions.join(','),
  ]);

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const toggleExpand = (key: string) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const activePlan = generatedPlan
    ? generatedPlan.days.reduce<Record<string, DayPlan>>((acc, day) => {
        acc[day.day] = {
          breakfast: day.breakfast,
          lunch: day.lunch,
          dinner: day.dinner,
        };
        return acc;
      }, {})
    : MEAL_PLAN;
  const activeShoppingList = generatedPlan?.shopping_list ?? SHOPPING_LIST;
  const day = activePlan[activeDay] ?? MEAL_PLAN[activeDay];
  const totalKcal = day.breakfast.kcal + day.lunch.kcal + day.dinner.kcal;
  const totalP = day.breakfast.p + day.lunch.p + day.dinner.p;
  const totalC = day.breakfast.c + day.lunch.c + day.dinner.c;
  const totalF = day.breakfast.f + day.lunch.f + day.dinner.f;

  const goalLabel = generatedPlan?.goal_label ?? (profile.goal === 'g1' ? 'Weight Loss'
    : profile.goal === 'g2' ? 'Muscle Building'
      : profile.goal === 'g3' ? 'Weight Maintenance'
        : profile.goal === 'g4' ? 'Flexibility'
          : 'Endurance');

  const handleGetSuggestions = async () => {
    setLoadingAdvice(true);
    try {
      const response = await apiRequest<{ reply: string }>('/ai/nutrition/advice', {
        method: 'POST',
        body: {
          goal: profile.goal,
          meal_query: mealSearch,
          daily_calories: totalKcal,
          daily_protein: totalP,
          daily_carbs: totalC,
          daily_fat: totalF,
          cuisine: profile.cuisine,
          favorite_meal: profile.favoriteMeal,
          allergies: profile.allergies,
        },
      });
      setNutritionAdvice(response.reply);
    } catch (error) {
      setNutritionAdvice(error instanceof Error ? error.message : 'Unable to load nutrition suggestions right now.');
    } finally {
      setLoadingAdvice(false);
    }
  };

  const MealCard = ({ label, meal, expandKey }: { label: string; meal: MealEntry; expandKey: string }) => {
    const ingKey = `${expandKey}-ing`;
    const instKey = `${expandKey}-inst`;
    return (
      <View style={styles.mealCard}>
        <Text style={styles.mealLabel}>{label}</Text>
        <Text style={styles.mealName}>{meal.name}</Text>
        <Text style={styles.mealDesc}>{meal.desc}</Text>
        <View style={styles.mealMacroRow}>
          <View style={styles.macroChip}><Text>🔥</Text><Text style={[styles.macroChipText, { color: '#F97316' }]}>{meal.kcal} kcal</Text></View>
          <View style={styles.macroChip}><Text>💪</Text><Text style={[styles.macroChipText, { color: '#4F8EF7' }]}>{meal.p}g P</Text></View>
          <View style={styles.macroChip}><Text>🌾</Text><Text style={[styles.macroChipText, { color: '#22C55E' }]}>{meal.c}g C</Text></View>
          <View style={styles.macroChip}><Text>🫒</Text><Text style={[styles.macroChipText, { color: '#F59E0B' }]}>{meal.f}g F</Text></View>
        </View>
        <TouchableOpacity style={styles.expandRow} onPress={() => toggleExpand(ingKey)}>
          <Text style={styles.expandLabel}>Ingredients</Text>
          <Ionicons name={expanded[ingKey] ? 'chevron-up' : 'chevron-down'} size={16} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>
        {expanded[ingKey] && (
          <View style={styles.expandContent}>
            {meal.ingredients.map((ing, i) => <Text key={i} style={styles.expandItem}>• {ing}</Text>)}
          </View>
        )}
        {meal.instructions && meal.instructions.length > 0 && (
          <>
            <View style={styles.expandDivider} />
            <TouchableOpacity style={styles.expandRow} onPress={() => toggleExpand(instKey)}>
              <Text style={styles.expandLabel}>Instructions</Text>
              <Ionicons name={expanded[instKey] ? 'chevron-up' : 'chevron-down'} size={16} color="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
            {expanded[instKey] && (
              <View style={styles.expandContent}>
                {meal.instructions.map((inst, i) => <Text key={i} style={styles.expandItem}>{i + 1}. {inst}</Text>)}
              </View>
            )}
          </>
        )}
      </View>
    );
  };

  /* Shopping List Screen */
  if (showShopping) {
    const totalItems = activeShoppingList.reduce((s, cat) => s + cat.items.length, 0);
    const checkedCount = checkedItems.size;
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.slHeader}>
          <TouchableOpacity onPress={() => setShowShopping(false)} style={styles.slBackBtn}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.slTitle}>Weekly Shopping List</Text>
            <Text style={styles.slSubtitle}>{checkedCount} of {totalItems} items checked</Text>
          </View>
          <TouchableOpacity onPress={() => setCheckedItems(new Set())} style={styles.slClearBtn}>
            <Text style={styles.slClearText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Progress */}
        <View style={styles.slProgressBg}>
          <View style={[styles.slProgressFill, { width: `${totalItems > 0 ? (checkedCount / totalItems) * 100 : 0}%`, backgroundColor: Colors.accentPurple }]} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.slScroll}>
          {activeShoppingList.map((section) => (
            <View key={section.category}>
              {/* Category Header */}
              <Text style={styles.slCategoryHeader}>{section.category}</Text>
              <View style={styles.slSection}>
                {section.items.map((item, i) => {
                  const key = `${section.category}-${item.name}`;
                  const checked = checkedItems.has(key);
                  return (
                    <TouchableOpacity
                      key={key}
                      style={[styles.slRow, i !== section.items.length - 1 && styles.slRowBorder]}
                      onPress={() => toggleCheck(key)}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.slCheckBox, checked && styles.slCheckBoxActive]}>
                        {checked && <Ionicons name="checkmark" size={12} color="#fff" />}
                      </View>
                      <Text style={[styles.slItemName, checked && styles.slItemNameChecked]}>
                        {item.name}
                      </Text>
                      <Text style={[styles.slItemQty, checked && styles.slItemQtyChecked]}>
                        {item.qty}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Fixed Copy List Button */}
        <View style={styles.slBottomBar}>
          <TouchableOpacity
            style={styles.slCopyBtn}
            activeOpacity={0.85}
            onPress={() => { }}
          >
            <View style={[styles.slCopyBtnGrad, { backgroundColor: Colors.accentPurple }]}>
              <Ionicons name="copy-outline" size={18} color="#fff" />
              <Text style={styles.slCopyBtnText}>Copy List</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VictoryHeader />

        {loadingPlan && (
          <View style={styles.planLoading}>
            <ActivityIndicator color={Colors.primary} size="large" />
            <Text style={styles.planLoadingText}>Building your nutrition plan...</Text>
          </View>
        )}

        {/* Tab Bar */}
        <View style={styles.planTabRow}>
          {PLAN_TABS.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.planTabBtn, planTab === t && styles.planTabBtnActive]}
              onPress={() => setPlanTab(t)}
            >
              <Text style={[styles.planTabText, planTab === t && styles.planTabTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── MY PLAN ── */}
        {planTab === 'My Plan' && !loadingPlan && (
          <View style={styles.planContent}>
            <Text style={styles.planTitle}>7-DAY TAILORED {goalLabel.toUpperCase()} PLAN</Text>
            <Text style={styles.planDesc}>
              {generatedPlan?.summary ?? 'A carefully portion-controlled nutrition plan designed for you, with practical meals that match your goal.'}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayScroll}>
              {PLAN_DAYS.map((d) => (
                <TouchableOpacity key={d} style={[styles.dayBtn, activeDay === d && styles.dayBtnActive]} onPress={() => setActiveDay(d)}>
                  <Text style={[styles.dayBtnText, activeDay === d && styles.dayBtnTextActive]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.dayUnderline} />
            <View style={styles.totalsCard}>
              <Text style={styles.totalsTitle}>Daily Totals</Text>
              <View style={styles.totalsGrid}>
                <View style={styles.totalsItem}><Text style={styles.totalsIcon}>🔥</Text><Text style={styles.totalsVal}>{totalKcal} kcal</Text></View>
                <View style={styles.totalsItem}><Text style={styles.totalsIcon}>💪</Text><Text style={styles.totalsVal}>{totalP}g P</Text></View>
                <View style={styles.totalsItem}><Text style={styles.totalsIcon}>🌾</Text><Text style={styles.totalsVal}>{totalC}g C</Text></View>
                <View style={styles.totalsItem}><Text style={styles.totalsIcon}>🫒</Text><Text style={styles.totalsVal}>{totalF}g F</Text></View>
              </View>
            </View>
            <MealCard label="Breakfast" meal={day.breakfast} expandKey={`${activeDay}-b`} />
            <MealCard label="Lunch" meal={day.lunch} expandKey={`${activeDay}-l`} />
            <MealCard label="Dinner" meal={day.dinner} expandKey={`${activeDay}-d`} />
            <TouchableOpacity style={styles.shoppingBtn} activeOpacity={0.85} onPress={() => setShowShopping(true)}>
              <View style={[styles.shoppingBtnGrad, { backgroundColor: Colors.accentPurple }]}>
                <Text style={styles.shoppingBtnText}>Weekly Shopping List</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.newPlanBtn} activeOpacity={0.7}>
              <Text style={styles.newPlanBtnText}>Create New Plan</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── TRACKER ── */}
        {planTab === 'Tracker' && (
          <View style={styles.planContent}>
            {/* Daily Summary */}
            <View style={styles.trackerSection}>
              <View style={styles.trackerSectionHeader}>
                <Text style={styles.trackerSectionIcon}>📊</Text>
                <Text style={styles.trackerSectionTitle}>DAILY SUMMARY</Text>
              </View>
              <View style={styles.macroGrid}>
                {[
                  { label: 'CALORIES', val: '0', unit: 'kcal' },
                  { label: 'PROTEIN', val: '0', unit: 'g' },
                  { label: 'CARBS', val: '0', unit: 'g' },
                  { label: 'FAT', val: '0', unit: 'g' },
                ].map((m) => (
                  <View key={m.label} style={styles.macroGridCell}>
                    <Text style={styles.macroGridLabel}>{m.label}</Text>
                    <View style={styles.macroGridValRow}>
                      <Text style={styles.macroGridVal}>{m.val}</Text>
                      <Text style={styles.macroGridUnit}> {m.unit}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* AI Suggestions */}
            <View style={styles.trackerSection}>
              <View style={styles.trackerSectionHeader}>
                <Text style={styles.trackerSectionIcon}>✨</Text>
                <Text style={styles.trackerSectionTitle}>AI SUGGESTIONS</Text>
              </View>
              <TouchableOpacity style={styles.getSuggestionsBtn} activeOpacity={0.85} onPress={handleGetSuggestions} disabled={loadingAdvice}>
                {loadingAdvice ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.getSuggestionsBtnText}>GET SUGGESTIONS</Text>
                )}
              </TouchableOpacity>
              {nutritionAdvice ? <Text style={styles.adviceText}>{nutritionAdvice}</Text> : null}
            </View>

            {/* Log a Meal */}
            <View style={styles.trackerSection}>
              <View style={styles.trackerSectionHeader}>
                <Text style={styles.trackerSectionIcon}>🍽️</Text>
                <Text style={styles.trackerSectionTitle}>LOG A MEAL</Text>
              </View>
              <View style={styles.mealSearchRow}>
                <TextInput
                  style={styles.mealSearchInput}
                  placeholder="Search for meals (e.g. Jollof"
                  placeholderTextColor="rgba(255,255,255,0.35)"
                  value={mealSearch}
                  onChangeText={setMealSearch}
                />
                <TouchableOpacity style={styles.mealSearchBtn} activeOpacity={0.85}>
                  <Text style={styles.mealSearchBtnText}>SEARCH</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.todayLogsLabel}>TODAY'S LOGS</Text>
              <Text style={styles.todayLogsEmpty}>
                No meals logged yet today. Honor your body with good fuel!
              </Text>
            </View>
          </View>
        )}

        {/* ── MEAL ANALYSIS ── */}
        {planTab === 'Meal Analysis' && (
          <View style={styles.planContent}>
            <View style={[styles.analysisCard, { backgroundColor: Colors.accentPurple }]}>
              <Ionicons name="analytics-outline" size={40} color="#fff" style={{ opacity: 0.3, marginBottom: 12 }} />
              <Text style={styles.analysisTitle}>AI MEAL ANALYSIS</Text>
              <Text style={styles.analysisDesc}>Take a photo of your meal to get instant macro tracking and health feedback.</Text>
              <TouchableOpacity style={styles.analysisBtn}>
                <Text style={styles.analysisBtnText}>Start Analysis</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.analysisEmptyCard}>
              <Ionicons name="camera-outline" size={40} color="rgba(255,255,255,0.2)" />
              <Text style={styles.analysisEmptyText}>No analysis yet</Text>
              <Text style={styles.analysisEmptySub}>
                Upload a photo of your meal and our AI will break down the calories, protein, carbs and fats.
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

/* ── Main Wizard Screen ── */
export default function JournalScreen() {
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [generationSuccess, setGenerationSuccess] = useState(false);
  const [done, setDone] = useState(false);
  const successScale = useState(new Animated.Value(0))[0];
  const [generatedPlan, setGeneratedPlan] = useState<NutritionPlanApiResponse | null>(null);

  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [cuisine, setCuisine] = useState('');
  const [favoriteMeal, setFavoriteMeal] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null);
  const [allergies, setAllergies] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Please select...');
  const [genderOpen, setGenderOpen] = useState(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [healthConditions, setHealthConditions] = useState<Set<string>>(new Set());

  const toggleHealth = (id: string) => {
    setHealthConditions((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const canNext = () => {
    if (step === 1) return selectedGoal !== null;
    if (step === 2) return cuisine.trim().length > 0;
    if (step === 3) return favoriteMeal.trim().length > 0;
    if (step === 4) return selectedDiet !== null;
    if (step === 5) return true;
    if (step === 6) return selectedActivity !== null;
    if (step === 7) return age.trim().length > 0 && gender !== 'Please select...' && height.trim().length > 0 && weight.trim().length > 0;
    return true;
  };

  const goNext = () => { if (step < TOTAL_STEPS) setStep(step + 1); };
  const goBack = () => { if (step > 1) setStep(step - 1); };

  const generatePlan = async () => {
    if (generating) {
      return;
    }

    setGenerating(true);
    setGenerationSuccess(false);

    try {
      const response = await apiRequest<{ plan: NutritionPlanApiResponse }>('/ai/nutrition/plan', {
        method: 'POST',
        body: {
          goal: selectedGoal,
          cuisine,
          favorite_meal: favoriteMeal,
          diet: selectedDiet,
          allergies,
          activity_level: selectedActivity,
          age,
          gender,
          height,
          weight,
          health_conditions: Array.from(healthConditions),
        },
      });

      setGeneratedPlan(response.plan);

      setGenerating(false);
      setGenerationSuccess(true);
      successScale.setValue(0);
      Animated.sequence([
        Animated.timing(successScale, {
          toValue: 1,
          duration: 180,
          easing: Easing.out(Easing.back(1.4)),
          useNativeDriver: true,
        }),
        Animated.delay(700),
      ]).start(() => {
        setGenerationSuccess(false);
        setDone(true);
      });
    } catch {
      setGenerating(false);
      setGenerationSuccess(false);
    }
  };

  const progressFraction = (step - 1) / (TOTAL_STEPS - 1);

  if (generating) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={Colors.primary} style={{ marginBottom: 40 }} />
        <Text style={styles.quoteText}>Generating your plan...</Text>
      </View>
    );
  }

  if (generationSuccess) {
    return (
      <View style={styles.loadingScreen}>
        <Animated.View style={[styles.successRing, { transform: [{ scale: successScale }] }]}>
          <Ionicons name="checkmark" size={42} color="#fff" />
        </Animated.View>
        <Text style={styles.quoteText}>Plan saved</Text>
      </View>
    );
  }

  if (done) {
    return (
      <MealPlanResult
        profile={{
          goal: selectedGoal,
          cuisine,
          favoriteMeal,
          selectedDiet,
          allergies,
          selectedActivity,
          age,
          gender,
          height,
          weight,
          healthConditions: Array.from(healthConditions),
        }}
        initialPlan={generatedPlan}
      />
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <VictoryHeader />

      {/* Progress Bar */}
      <View style={styles.progressBarBg}>
        <View
          style={[styles.progressBarFill, { width: `${progressFraction * 100}%`, backgroundColor: Colors.accentPurple }]}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Text style={styles.stepCounter}>Step {step} of {TOTAL_STEPS}</Text>

        {step === 1 && (
          <View>
            <Text style={styles.bigQuestion}>What is your primary goal?</Text>
            <Text style={styles.bigSub}>Choose the goal that motivates you the most.</Text>
            <OptionList items={GOALS} selected={selectedGoal} onSelect={setSelectedGoal} />
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.bigQuestion}>What country's dishes do you cook or enjoy most?</Text>
            <Text style={styles.bigSub}>We'll adapt the plan to your taste preferences and available ingredients.</Text>
            <View style={styles.textInputCard}>
              <TextInput style={styles.textInput} placeholder="e.g. Italian, Ghanaian, Mediterranean..." placeholderTextColor="rgba(255,255,255,0.3)" value={cuisine} onChangeText={setCuisine} multiline textAlignVertical="top" />
            </View>
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={styles.bigQuestion}>What is your absolute favorite meal?</Text>
            <Text style={styles.bigSub}>We'll schedule it 2x a week—guilt-free!</Text>
            <View style={styles.textInputCard}>
              <TextInput style={styles.textInput} placeholder="e.g. Pizza, Jollof Rice, Burger..." placeholderTextColor="rgba(255,255,255,0.3)" value={favoriteMeal} onChangeText={setFavoriteMeal} multiline textAlignVertical="top" />
            </View>
          </View>
        )}

        {step === 4 && (
          <View>
            <Text style={styles.bigQuestion}>Do you have any dietary preferences?</Text>
            <Text style={styles.bigSub}>We'll make sure your plan fits you perfectly.</Text>
            <OptionList items={DIET_PREFS} selected={selectedDiet} onSelect={setSelectedDiet} />
          </View>
        )}

        {step === 5 && (
          <View>
            <Text style={styles.bigQuestion}>Allergies or dislikes?</Text>
            <Text style={[styles.bigSub, { textAlign: 'center' }]}>Tell us any foods to avoid (comma-separated).</Text>
            <View style={styles.textInputCard}>
              <TextInput style={styles.textInput} placeholder="e.g., Nuts, lactose, dislike cilantro..." placeholderTextColor="rgba(255,255,255,0.3)" value={allergies} onChangeText={setAllergies} multiline textAlignVertical="top" />
            </View>
          </View>
        )}

        {step === 6 && (
          <View>
            <Text style={styles.bigQuestion}>How active are you in daily life?</Text>
            <Text style={styles.bigSub}>Not including your training with us.</Text>
            <OptionList items={ACTIVITY_LEVELS} selected={selectedActivity} onSelect={setSelectedActivity} />
          </View>
        )}

        {step === 7 && (
          <View>
            <Text style={styles.bigQuestion}>Review your details</Text>
            <Text style={[styles.bigSub, { textAlign: 'center' }]}>We've pulled this data from your profile. You can adjust it for this plan if needed.</Text>

            <Text style={styles.fieldLabel}>Age</Text>
            <View style={styles.textInputCard}>
              <TextInput style={[styles.textInput, styles.textInputSingle]} placeholder="e.g., 28" placeholderTextColor="rgba(255,255,255,0.3)" value={age} onChangeText={setAge} keyboardType="numeric" />
            </View>

            <Text style={styles.fieldLabel}>Gender</Text>
            <TouchableOpacity style={[styles.textInputCard, styles.genderSelector]} onPress={() => setGenderOpen(!genderOpen)} activeOpacity={0.85}>
              <Text style={[styles.textInput, styles.textInputSingle, { flex: 1 }]}>{gender}</Text>
              <Ionicons name={genderOpen ? 'chevron-up' : 'chevron-down'} size={16} color="rgba(255,255,255,0.4)" />
            </TouchableOpacity>
            {genderOpen && (
              <View style={styles.genderDropdown}>
                {GENDERS.filter(g => g !== 'Please select...').map((g) => (
                  <TouchableOpacity key={g} style={[styles.genderOption, gender === g && styles.genderOptionActive]} onPress={() => { setGender(g); setGenderOpen(false); }}>
                    <Text style={[styles.genderOptionText, gender === g && styles.genderOptionTextActive]}>{g}</Text>
                    {gender === g && <Ionicons name="checkmark" size={14} color="#A855F7" />}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.fieldLabel}>Height (in cm)</Text>
            <View style={styles.textInputCard}>
              <TextInput style={[styles.textInput, styles.textInputSingle]} placeholder="e.g., 175" placeholderTextColor="rgba(255,255,255,0.3)" value={height} onChangeText={setHeight} keyboardType="numeric" />
            </View>

            <Text style={styles.fieldLabel}>Weight (in kg)</Text>
            <View style={styles.textInputCard}>
              <TextInput style={[styles.textInput, styles.textInputSingle]} placeholder="e.g., 70" placeholderTextColor="rgba(255,255,255,0.3)" value={weight} onChangeText={setWeight} keyboardType="numeric" />
            </View>
          </View>
        )}

        {step === 8 && (
          <View>
            <Text style={styles.bigQuestion}>Do you have any health conditions?</Text>
            <Text style={[styles.bigSub, { textAlign: 'center' }]}>We use this to provide tailored recommendations in the 'Heal with Food' section.</Text>
            <View style={styles.optionList}>
              {HEALTH_CONDITIONS.map((item) => {
                const active = healthConditions.has(item.id);
                return (
                  <TouchableOpacity key={item.id} style={[styles.optionCard, active && styles.optionCardActive]} onPress={() => toggleHealth(item.id)} activeOpacity={0.85}>
                    <Text style={styles.optionEmoji}>{item.emoji}</Text>
                    <Text style={[styles.optionLabel, active && styles.optionLabelActive, { flex: 1 }]}>{item.label}</Text>
                    {active && <View style={styles.optionCheck}><Ionicons name="checkmark" size={13} color="#fff" /></View>}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        <View style={{ height: 110 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn} disabled={step === 1}>
          <Text style={[styles.backBtnText, step === 1 && styles.backBtnDisabled]}>Back</Text>
        </TouchableOpacity>
        {step < TOTAL_STEPS ? (
          <TouchableOpacity onPress={goNext} disabled={!canNext()} activeOpacity={0.85}>
            <View style={[styles.nextBtn, { backgroundColor: canNext() ? Colors.accentPurple : '#2A2A40' }]}>
              <Text style={[styles.nextBtnText, !canNext() && styles.nextBtnDisabled]}>Next</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={generatePlan} activeOpacity={0.85}>
            <View style={[styles.generateBtn, { backgroundColor: Colors.accentPurple }]}>
              {generating ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.generateBtnText}>Curate Your Plan</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  /* Progress Bar */
  progressBarBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', width: '100%' },
  progressBarFill: { height: '100%' },

  scrollContent: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 24 },
  stepCounter: { color: Colors.textMuted, fontSize: 12, fontFamily: 'Inter_400Regular', marginBottom: 24, letterSpacing: 0.5 },

  bigQuestion: { fontSize: 28, fontWeight: '800', color: '#fff', fontFamily: 'Inter_700Bold', lineHeight: 38, marginBottom: 12 },
  bigSub: { fontSize: 14, color: Colors.textMuted, fontFamily: 'Inter_400Regular', lineHeight: 21, marginBottom: 32 },

  optionList: { gap: 10 },
  optionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#13132A', borderRadius: 16, paddingHorizontal: 18, paddingVertical: 16, borderWidth: 1.5, borderColor: '#1E1E38', gap: 16 },
  optionCardActive: { borderColor: '#A855F7', backgroundColor: 'rgba(168,85,247,0.10)' },
  optionEmoji: { fontSize: 24, width: 32, textAlign: 'center' },
  optionLabel: { fontSize: 16, fontWeight: '700', color: 'rgba(255,255,255,0.8)', fontFamily: 'Inter_700Bold' },
  optionLabelActive: { color: '#fff' },
  optionSub: { fontSize: 12, color: Colors.textMuted, fontFamily: 'Inter_400Regular', marginTop: 2 },
  optionCheck: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#A855F7', justifyContent: 'center', alignItems: 'center' },

  textInputCard: { backgroundColor: '#13132A', borderRadius: 14, padding: 16, marginBottom: 16, borderWidth: 1.5, borderColor: '#1E1E38' },
  textInput: { color: '#fff', fontSize: 15, fontFamily: 'Inter_400Regular', lineHeight: 24, minHeight: 90 },
  textInputSingle: { minHeight: 0 },

  fieldLabel: { color: Colors.textMuted, fontSize: 13, fontFamily: 'Inter_400Regular', marginBottom: 8, marginTop: 4, letterSpacing: 0.2 },
  genderSelector: { flexDirection: 'row', alignItems: 'center' },
  genderDropdown: { backgroundColor: '#1E1E38', borderRadius: 12, overflow: 'hidden', marginTop: -12, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  genderOption: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  genderOptionActive: { backgroundColor: 'rgba(168,85,247,0.1)' },
  genderOptionText: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontFamily: 'Inter_400Regular' },
  genderOptionTextActive: { color: '#A855F7', fontWeight: '700', fontFamily: 'Inter_700Bold' },

  loadingScreen: { flex: 1, backgroundColor: '#0D1220', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  quoteText: { color: '#fff', fontSize: 20, fontWeight: '800', fontFamily: 'Inter_700Bold', textAlign: 'center', lineHeight: 30, letterSpacing: 0.5 },
  successRing: { width: 96, height: 96, borderRadius: 48, backgroundColor: Colors.accentPurple, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  planLoading: { paddingVertical: 24, alignItems: 'center', justifyContent: 'center', gap: 12 },
  planLoadingText: { color: Colors.textMuted, fontSize: 14, fontFamily: 'Inter_400Regular' },

  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 20, paddingBottom: Platform.OS === 'ios' ? 32 : 20, backgroundColor: Colors.background, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  backBtn: { paddingHorizontal: 8, paddingVertical: 8 },
  backBtnText: { color: 'rgba(255,255,255,0.6)', fontSize: 16, fontFamily: 'Inter_400Regular' },
  backBtnDisabled: { color: 'rgba(255,255,255,0.2)' },
  nextBtn: { paddingHorizontal: 36, paddingVertical: 14, borderRadius: 14 },
  generateBtn: { paddingHorizontal: 28, paddingVertical: 14, borderRadius: 14 },
  nextBtnText: { color: '#fff', fontSize: 16, fontWeight: '700', fontFamily: 'Inter_700Bold' },
  nextBtnDisabled: { color: 'rgba(255,255,255,0.35)' },

  /* Wizard Header */
  wizardHeader: { alignItems: 'center', paddingTop: 52, paddingBottom: 16, backgroundColor: Colors.background },
  wizardBrandTitle: { fontSize: 24, fontWeight: '700', color: '#fff', letterSpacing: 8, fontFamily: 'Inter_700Bold' },
  wizardBrandSub: { fontSize: 12, fontWeight: '600', color: '#fff', letterSpacing: 6, marginTop: 4, fontFamily: 'Inter_600SemiBold' },

  /* ── MealPlanResult ── */
  planBrand: { alignItems: 'center', paddingTop: 52, paddingBottom: 8 },
  planBrandTitle: { fontSize: 22, fontWeight: '800', color: '#fff', letterSpacing: 6, fontFamily: 'Inter_700Bold' },
  planBrandSub: { fontSize: 11, fontWeight: '600', color: '#fff', letterSpacing: 5, marginTop: 2 },

  planTabRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  planTabBtn: { flex: 1, paddingVertical: 13, alignItems: 'center' },
  planTabBtnActive: { borderBottomWidth: 2, borderBottomColor: '#A855F7' },
  planTabText: { fontSize: 13, fontWeight: '600', color: Colors.textMuted },
  planTabTextActive: { color: '#A855F7' },

  planContent: { paddingHorizontal: 18, paddingTop: 20 },
  planTitle: { fontSize: 22, fontWeight: '800', color: '#fff', fontFamily: 'Inter_700Bold', lineHeight: 30, marginBottom: 10 },
  planDesc: { fontSize: 13, color: Colors.textMuted, fontFamily: 'Inter_400Regular', lineHeight: 20, marginBottom: 20 },

  dayScroll: { marginBottom: 0 },
  dayBtn: { paddingHorizontal: 16, paddingVertical: 10, marginRight: 4 },
  dayBtnActive: { borderBottomWidth: 2, borderBottomColor: '#A855F7' },
  dayBtnText: { fontSize: 14, fontWeight: '600', color: Colors.textMuted },
  dayBtnTextActive: { color: '#A855F7', fontWeight: '700' },
  dayUnderline: { height: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginBottom: 16 },

  totalsCard: { backgroundColor: '#13132A', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  totalsTitle: { fontSize: 12, color: Colors.textMuted, textAlign: 'center', marginBottom: 12, letterSpacing: 0.5, textTransform: 'uppercase' },
  totalsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  totalsItem: { alignItems: 'center', gap: 4 },
  totalsIcon: { fontSize: 18 },
  totalsVal: { fontSize: 13, fontWeight: '700', color: '#fff', fontFamily: 'Inter_700Bold' },

  mealCard: { backgroundColor: '#13132A', borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  mealLabel: { fontSize: 13, fontWeight: '700', color: '#A855F7', fontFamily: 'Inter_700Bold', marginBottom: 6, letterSpacing: 0.3 },
  mealName: { fontSize: 16, fontWeight: '800', color: '#fff', fontFamily: 'Inter_700Bold', marginBottom: 4 },
  mealDesc: { fontSize: 13, color: Colors.textMuted, fontFamily: 'Inter_400Regular', lineHeight: 19, marginBottom: 12 },
  mealMacroRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  macroChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  macroChipText: { fontSize: 12, fontWeight: '700', fontFamily: 'Inter_700Bold' },

  expandRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  expandLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 14 },
  expandContent: { paddingBottom: 8, paddingLeft: 4 },
  expandItem: { color: Colors.textMuted, fontSize: 13, lineHeight: 22 },
  expandDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginVertical: 2 },

  shoppingBtn: { marginTop: 8, marginBottom: 12 },
  shoppingBtnGrad: { borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  shoppingBtnText: { color: '#fff', fontSize: 16, fontWeight: '800', fontFamily: 'Inter_700Bold' },
  newPlanBtn: { alignItems: 'center', paddingVertical: 12 },
  newPlanBtnText: { color: '#A855F7', fontSize: 14, fontWeight: '600' },

  /* Tracker */
  trackerSection: { backgroundColor: '#13132A', borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  trackerSectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  trackerSectionIcon: { fontSize: 20 },
  trackerSectionTitle: { fontSize: 15, fontWeight: '800', color: '#fff', fontFamily: 'Inter_700Bold', letterSpacing: 0.5 },
  macroGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  macroGridCell: { width: '47%', backgroundColor: '#0D0D1E', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  macroGridLabel: { fontSize: 10, color: Colors.textMuted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Inter_400Regular' },
  macroGridValRow: { flexDirection: 'row', alignItems: 'baseline' },
  macroGridVal: { fontSize: 32, fontWeight: '800', color: Colors.primary, fontFamily: 'Inter_700Bold' },
  macroGridUnit: { fontSize: 13, color: Colors.textMuted, fontFamily: 'Inter_400Regular' },
  getSuggestionsBtn: { backgroundColor: '#0D0D1E', borderRadius: 12, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  getSuggestionsBtnText: { color: '#fff', fontSize: 13, fontWeight: '700', fontFamily: 'Inter_700Bold', letterSpacing: 1 },
  adviceText: { color: '#fff', fontSize: 13, lineHeight: 20, marginTop: 12, fontFamily: 'Inter_400Regular' },
  mealSearchRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  mealSearchInput: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    minHeight: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    outlineStyle: 'none' as any,
  },
  mealSearchBtn: { backgroundColor: Colors.primary, borderRadius: 10, paddingHorizontal: 16, justifyContent: 'center' },
  mealSearchBtnText: { color: '#000', fontSize: 12, fontWeight: '800', fontFamily: 'Inter_700Bold', letterSpacing: 0.5 },
  todayLogsLabel: { fontSize: 10, color: Colors.textMuted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Inter_400Regular' },
  todayLogsEmpty: { color: Colors.textMuted, fontSize: 13, fontFamily: 'Inter_400Regular', fontStyle: 'italic', lineHeight: 20 },

  /* Meal Analysis */
  analysisCard: { backgroundColor: '#13132A', borderRadius: 16, padding: 20, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  analysisTitle: { fontSize: 22, fontWeight: '800', color: '#fff', fontFamily: 'Inter_700Bold', lineHeight: 30, marginBottom: 10 },
  analysisDesc: { fontSize: 14, color: Colors.textMuted, fontFamily: 'Inter_400Regular', lineHeight: 21, marginBottom: 20 },
  analysisUploadGrad: { borderRadius: 14, paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  analysisUploadText: { color: '#fff', fontSize: 15, fontWeight: '700', fontFamily: 'Inter_700Bold' },
  analysisEmptyCard: { backgroundColor: '#13132A', borderRadius: 16, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  analysisEmptyText: { color: 'rgba(255,255,255,0.5)', fontSize: 16, fontWeight: '700', fontFamily: 'Inter_700Bold', marginTop: 14, marginBottom: 8 },
  analysisEmptySub: { color: Colors.textMuted, fontSize: 13, fontFamily: 'Inter_400Regular', textAlign: 'center', lineHeight: 20 },

  /* ── Shopping List ── */
  slHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 18, paddingTop: 56, paddingBottom: 16, backgroundColor: Colors.background },
  slBackBtn: { padding: 4 },
  slTitle: { fontSize: 16, fontWeight: '800', color: '#fff', fontFamily: 'Inter_700Bold' },
  slSubtitle: { fontSize: 12, color: Colors.textMuted, fontFamily: 'Inter_400Regular', marginTop: 2 },
  slClearBtn: { padding: 8 },
  slClearText: { color: '#A855F7', fontSize: 13, fontFamily: 'Inter_400Regular' },
  slProgressBg: { height: 4, backgroundColor: 'rgba(255,255,255,0.1)', width: '100%' },
  slProgressFill: { height: '100%', backgroundColor: '#A855F7' },
  slScroll: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 40 },
  slCategoryHeader: { fontSize: 14, fontWeight: '800', color: '#A855F7', fontFamily: 'Inter_700Bold', letterSpacing: 0.3, marginTop: 20, marginBottom: 4 },
  slSection: { backgroundColor: '#13132A', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', overflow: 'hidden', marginBottom: 4 },
  slRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 13, gap: 12 },
  slRowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  slCheckBox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.25)', justifyContent: 'center', alignItems: 'center' },
  slCheckBoxActive: { backgroundColor: '#A855F7', borderColor: '#A855F7' },
  slItemName: { flex: 1, fontSize: 14, color: '#fff', fontFamily: 'Inter_400Regular' },
  slItemNameChecked: { color: Colors.textMuted, textDecorationLine: 'line-through' },
  slItemQty: { fontSize: 13, color: Colors.textMuted, fontFamily: 'Inter_400Regular', textAlign: 'right', maxWidth: 130 },
  slItemQtyChecked: { color: 'rgba(255,255,255,0.2)' },

  slBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 32 : 20,
    paddingTop: 16,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  slCopyBtn: {
    shadowColor: '#D946EF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 10,
  },
  slCopyBtnGrad: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slCopyBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.3,
  },
  generateBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  analysisBtn: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 12,
  },
  analysisBtnText: {
    color: Colors.accentPurple,
    fontWeight: '700',
    fontSize: 14,
  },
});


