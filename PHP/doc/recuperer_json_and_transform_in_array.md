





    /**
    * @Route("/application/project/{id}/detail/meal/plan/list", name="application_project_detail_meal_plan_list")
    */
    public function detailMealPlansList(Request $request, Project $project  = null, EntityManagerInterface $manager): Response
    {
        
        // Check
        if (null === $project) {
            return $this->redirectToRoute('backend_general_dashboard', [], 301);
        }
        
        // récupère les fichiers json, les ouvres, les lies, les decodes et les transformes en array
        $proposals = $manager->getRepository(Proposal::class)->findBy([ 'project' => $project->getId()]);
        $render_proposals = [];
        foreach($proposals as $proposal){

            $ressource = fopen('.'.$proposal->getPathFileProposal(), 'rb');
            $content = fread($ressource, filesize('.'.$proposal->getPathFileProposal()));

            $render_proposals[] = json_decode($content, true);
        }

        // on merge les meal plans, s'il existe
        if (isset($render_proposals[0]) && isset($render_proposals[0]["meal_plans"])) {
            $mergeMealPlans = $render_proposals[0]["meal_plans"];

            if (isset($render_proposals[1]) && isset($render_proposals[1]["meal_plans"])) {
                $mergeMealPlans = array_merge($render_proposals[0]["meal_plans"], $render_proposals[1]["meal_plans"]);
                
                if (isset($render_proposals[2]) && isset($render_proposals[2]["meal_plans"])) {
                    $mergeMealPlans = array_merge($render_proposals[0]["meal_plans"], $render_proposals[1]["meal_plans"], $render_proposals[2]["meal_plans"]);
                }
            }
        }

        // View parameters
        $viewParameters = [];
        $viewParameters['project'] = $project;
        $viewParameters['mergeMealPlans'] = $mergeMealPlans;

        return $this->render('Application/Pages/Project/detail/detail-meal-plans-list.html.twig', $viewParameters);
    }